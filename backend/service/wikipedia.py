import wikipedia

def search_wikipedia(query: str):
    try:
        search_results = wikipedia.search(query)
        if search_results:
            if len(search_results) > 1:
                page = wikipedia.page(search_results[1])
            else:
                page = wikipedia.page(search_results[0])
            return {"title": page.title, "url": page.url, "summary": page.summary}
        else:
            return {"error": "No results found"}
    except Exception as e:
        return {"error": str(e)}
