import React, { useState, useEffect } from "react";
import { fetchArticles, createArticle } from "../api/api";
import { ContentType } from "../api/enums";
import styles from "./ArticleForm.module.css";

interface ArticleFormProps {
  lawId: number;
  onAddArticle: (article: any) => void;
  onSelectArticle: (article: any) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  lawId,
  onAddArticle,
  onSelectArticle,
}) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [newArticle, setNewArticle] = useState({
    content: "",
    contentType: ContentType.TextBox,
    lawId,
  });
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  useEffect(() => {
    loadArticles();
  }, [lawId]);

  const loadArticles = async () => {
    const articles = await fetchArticles(lawId);
    setArticles(articles);
  };

  const handleArticleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const handleContentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const contentType = parseInt(e.target.value, 10);
    setNewArticle({
      ...newArticle,
      contentType,
      content: "",
    });
  };

  const handleAddArticle = async () => {
    const article = await createArticle(newArticle);
    onAddArticle(article);
    setArticles([...articles, article]);
    setNewArticle({ content: "", contentType: ContentType.TextBox, lawId });
    setSelectedArticle(article);
  };

  const handleSelectArticle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = articles.find(
      (a) => a.id === parseInt(e.target.value, 10)
    );
    setSelectedArticle(selected);
    onSelectArticle(selected);
  };

  return (
    <div className={styles.container}>
      <h2>Create Article</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="content">Content</label>
        {newArticle.contentType === ContentType.TextBox && (
          <input
            type="text"
            name="content"
            id="content"
            placeholder="Content"
            value={newArticle.content}
            onChange={handleArticleChange}
            required
          />
        )}
        {newArticle.contentType === ContentType.TextArea && (
          <textarea
            name="content"
            id="content"
            placeholder="Content"
            value={newArticle.content}
            onChange={handleArticleChange}
            required
            className={styles.textArea}
          />
        )}
        {newArticle.contentType === ContentType.PreformattedText && (
          <textarea
            name="content"
            id="content"
            placeholder="Preformatted Content"
            value={newArticle.content}
            onChange={handleArticleChange}
            required
            className={styles.textArea}
            style={{ whiteSpace: "pre" }}
          />
        )}
        {newArticle.contentType === ContentType.Table && (
          <textarea
            name="content"
            id="content"
            placeholder="Enter table data (comma-separated values)"
            value={newArticle.content}
            onChange={handleArticleChange}
            required
            className={styles.textArea}
          />
        )}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="contentType">Content Type</label>
        <select
          name="contentType"
          id="contentType"
          value={newArticle.contentType}
          onChange={handleContentTypeChange}
        >
          <option value={ContentType.TextBox}>Text Box</option>
          <option value={ContentType.TextArea}>Text Area</option>
          <option value={ContentType.PreformattedText}>
            Preformatted Text
          </option>
          <option value={ContentType.Table}>Table</option>
        </select>
      </div>
      <button className={styles.button} onClick={handleAddArticle}>
        Add Article
      </button>

      <h2>Select Existing Article</h2>
      {articles.length > 0 ? (
        <select
          onChange={handleSelectArticle}
          value={selectedArticle ? selectedArticle.id : ""}
        >
          <option value="">Select an article</option>
          {articles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.content.substring(0, 25)}
            </option>
          ))}
        </select>
      ) : (
        <p>No articles available.</p>
      )}

      {selectedArticle && <p>Selected Article: {selectedArticle.content}</p>}
    </div>
  );
};

export default ArticleForm;
