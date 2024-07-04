import React, { useState, useEffect } from "react";
import { fetchArticles, uploadImage } from "../api/api";
import styles from "./ImageForm.module.css";

interface ImageFormProps {
  lawId: number;
}

const ImageForm: React.FC<ImageFormProps> = ({ lawId }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imageDescriptions, setImageDescriptions] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  useEffect(() => {
    loadArticles();
  }, [lawId]);

  const loadArticles = async () => {
    const articles = await fetchArticles(lawId);
    setArticles(articles);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleImageDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newDescriptions = [...imageDescriptions];
    newDescriptions[index] = e.target.value;
    setImageDescriptions(newDescriptions);
  };

  const handleUploadImages = async () => {
    if (selectedArticle) {
      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append("image", images[i]);
        formData.append("description", imageDescriptions[i] || "");
        formData.append("articleId", selectedArticle.id.toString());
        await uploadImage(formData);
      }
    }
  };

  const handleSelectArticle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = articles.find(
      (a) => a.id === parseInt(e.target.value, 10)
    );
    setSelectedArticle(selected);
  };

  return (
    <div className={styles.container}>
      <h2>Upload Images</h2>

      <h2>Select Article</h2>
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

      {selectedArticle && (
        <>
          <p>Selected Article: {selectedArticle.content}</p>
          {images.map((image, index) => (
            <div key={index} className={styles.inputGroup}>
              <label htmlFor={`imageDescription${index}`}>
                Image Description
              </label>
              <input
                type="text"
                name={`imageDescription${index}`}
                id={`imageDescription${index}`}
                placeholder="Image Description"
                value={imageDescriptions[index] || ""}
                onChange={(e) => handleImageDescriptionChange(e, index)}
              />
            </div>
          ))}
          <label htmlFor="images">Select Images</label>
          <input
            className={styles.fileInput}
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
          />
          <button className={styles.button} onClick={handleUploadImages}>
            Upload Images
          </button>
        </>
      )}
    </div>
  );
};

export default ImageForm;
