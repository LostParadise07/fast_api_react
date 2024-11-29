import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { List, ListItem, ListItemText, TextField, Button } from "@mui/material";
import { fetchSavedArticles, updateArticleTags } from "../service/articles";

interface SavedArticle {
  id: number;
  username: string;
  title: string;
  summary: string;
  url: string;
  tags: string;
}

export default function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    fetchSavedArticles()
      .then((response: any) => {
        if (response && response.data) {
          setSavedArticles(response.data);
        } else {
          setError("Invalid response format");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch saved articles");
      });
  }, []);

  const handleUpdateTags = (id: number, newTags: string) => {
    updateArticleTags(id, newTags)
      .catch((error) => {
        console.error('Failed to update tags:', error);
        // Optionally, show an error message to the user
        alert('Failed to update tags');
      });
  };

  // Render error message if there's an error
  if (error) {
    return (
      <Paper sx={{ width: "90%", overflow: "hidden", m: "auto", mt: 8, p: 2 }}>
        <h2>Error</h2>
        <p>{error}</p>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: "90%", overflow: "hidden", m: "auto", mt: 8, p: 2 }}>
      <h2>Saved Articles</h2>
      <List>
        {savedArticles.map((article) => (
          <ListItem key={article.id} sx={{ mb: 2, borderBottom: "1px solid #ccc" }}>
            <ListItemText
              primary={article.title}
              secondary={
                <>
                  <p>Summary: {article.summary}</p>
                  <p>Tags: {article.tags}</p>
                </>
              }
            />
            <TextField
              label="Update Tags"
              defaultValue={article.tags}
              onBlur={(e) => handleUpdateTags(article.id, e.target.value)}
              sx={{ ml: 2, width: "40%" }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}