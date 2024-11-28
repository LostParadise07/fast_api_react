# crud/saved_articles.py
from fastapi import APIRouter, Depends
from database import conn
from models import SavedArticles,Users
from schemas import User,Article,UpdateTagsRequest
from CRUD.authen import get_current_user
from service.gemini import get_tags_from_gemini_pro  
from fastapi.exceptions import HTTPException

from service.wikipedia import search_wikipedia

saved_articles_router = APIRouter()

@saved_articles_router.post("/save_article")
async def save_article(article: Article, current_user: User = Depends(get_current_user)):
    try:
        tags = get_tags_from_gemini_pro(article.summary)

        conn.execute(SavedArticles.insert().values(
            username=current_user.username,
            title=article.title,
            url=article.url,
            summary=article.summary,
            tags=tags
        ))
        conn.commit()
        saved_articles_query = SavedArticles.select().where(
            SavedArticles.c.username == current_user.username
        )
        saved_articles = conn.execute(saved_articles_query).fetchall()
        data = []
        for row in saved_articles:
            data.append({
                "id": row.id,
                "username": row.username,
                "title": row.title,
                "url": row.url,
                "summary": row.summary,
                "tags": row.tags
            })

        return {"message": "Article saved successfully", "data": data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@saved_articles_router.get("/saved_articles")
async def get_saved_articles(current_user: User = Depends(get_current_user)):
    saved_articles = conn.execute(SavedArticles.select().where(SavedArticles.c.username == current_user.username)).fetchall()
    data = []
    for row in saved_articles:
        data.append({
            "id": row.id,
            "username": row.username,
            "title": row.title,
            "url": row.url,
            "summary": row.summary,
            "tags": row.tags
        })

    return {"message": "Success", "data": data}

@saved_articles_router.patch("/update_tags/{article_id}")
async def update_article_tags(
    article_id: int, 
    request: UpdateTagsRequest, 
    current_user: User = Depends(get_current_user)
):

    article = conn.execute(SavedArticles.select().where(SavedArticles.c.id == article_id)).fetchone()
    print(request.tags)
    if article :
        conn.execute(SavedArticles.update().values(tags=request.tags).where(SavedArticles.c.id == article_id))
        conn.commit()
        return {"message": "Tags updated successfully"}
    raise HTTPException(status_code=404, detail="Article not found or unauthorized")


@saved_articles_router.get("/search_article/{query}")
async def search_article(query: str):
    return search_wikipedia(query)

