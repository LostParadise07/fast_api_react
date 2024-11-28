import Cookies from "js-cookie";
import api from "./api";


// Function to save an article
export const saveArticle = async (article: any) => {
  let token: any = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let response = await api.post("/save_article", article, { headers });
  console.log(response)
  return response.data;
};

// Function to fetch all saved articles
export const fetchArticles = async (searchTerm: string) => {
    try {
      // Ensure the search term is properly encoded to handle special characters
      const response = await api.get(`/search_article/${encodeURIComponent(searchTerm)}`);
      return response.data;  // Assuming the data returned is a list of articles
    } catch (error) {
      throw new Error("Error fetching articles");
    }
  };

// Function to update tags for a saved article
export const updateArticleTags = async (id: number, tags: any) => {
  let token: any = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let response = await api.patch(`/update_tags/${id}`, {tags: tags}, { headers });
  return response.data;
};


export const fetchSavedArticles = async () => {
    let token: any = Cookies.get("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    let response = await api.get("/saved_articles", { headers });
    return response.data;
}; 