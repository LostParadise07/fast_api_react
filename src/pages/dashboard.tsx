import * as React from "react";
import Paper from "@mui/material/Paper";
import { Input, Button, List, ListItem, ListItemText } from "@mui/material";
import { fetchArticles, saveArticle } from "../service/articles";

interface Article {
  title: string;
  summary: string;
  url: string;
}

export default function StickyHeadTable() {
  const [searchTerm, setSearchTerm] = React.useState<string>("");  // State for search term
  const [articles, setArticles] = React.useState<Article | null>(null);  // State for a single article object (initially null)
  const [savedArticles, setSavedArticles] = React.useState<Article[]>([]);  // State for saved articles

  // Fetch articles based on the search term
  const handleSearch = () => {
    if (searchTerm.length > 0) {
      fetchArticles(searchTerm)
        .then((data) => {
            setArticles(data as Article);  // Set articles to the fetched data (single article object)
        })
        .catch((error) => {
          console.warn(error.message);  // Handle any fetch error
        });
    }
  };

  // Save an article to the saved list
  const handleSaveArticle = () => {
    if (articles) {
      setSavedArticles((prev) => [...prev, articles]);  // Add the current article to the saved list
      saveArticle(articles);  // Assuming saveArticle handles saving the article (e.g., in local storage, DB, etc.)
      alert("Article saved successfully!");  // Alert to confirm saving
    }
  };

  return (
    <div>
      <Paper sx={{ width: "90%", overflow: "hidden", m: "auto", mt: 8 }}>
        {/* Search Bar */}
        <Input
          placeholder="Search Articles"
          sx={{ width: "50%", m: "auto", mt: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // Update search term as user types
        />
        <Button
          sx={{ mt: 2, ml: 2 }}
          variant="contained"
          onClick={handleSearch}  // Trigger search when clicked
        >
          Search
        </Button>

        {/* Display Search Results */}
        <div>
          {articles ? (
            <List>
              <ListItem>
                <ListItemText
                  primary={articles.title}
                  secondary={articles.summary}
                />
              </ListItem>
              <div>
                You can read more about this article here:
                <a href={articles.url} target="_blank" rel="noopener noreferrer">{articles.url}</a>
              </div>
              {/* Save Article Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveArticle}  // Trigger saving when clicked
                sx={{ mt: 2 }}
              >
                Save Article
              </Button>
            </List>
          ) : (
            <p>No articles found</p>  // Show message when no article is found
          )}
        </div>

        {/* Saved Articles */}
        <div>
        <Button
              variant="contained"
              size="large"
              color="primary"
              href="/saved_articles"
              sx={{ mb: 2 }}
            >
              View Saved Article
            </Button>
        </div>
      </Paper>
    </div>
  );
}
