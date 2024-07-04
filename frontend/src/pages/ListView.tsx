import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRegulations } from '../api/api';
import styles from './ListView.module.css';

const ListView: React.FC = () => {
  const [regulations, setRegulations] = useState<any[]>([]);

  useEffect(() => {
    loadRegulations();
  }, []);

  const loadRegulations = async () => {
    const regs = await fetchRegulations();
    setRegulations(regs);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of Regulations</h1>
      
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Create Regulation</Link>
      </nav>

      {regulations.length > 0 ? (
        regulations.map((regulation) => (
          <div key={regulation.id} className={styles.regulation}>
            <h2>{regulation.name}</h2>
            <p><strong>Country Code:</strong> {regulation.countryIso2}</p>
            <p><strong>Description:</strong> {regulation.description}</p>
            <p><strong>Update Note:</strong> {regulation.lastUpdateNote}</p>
            {regulation.relatedLaws && regulation.relatedLaws.length > 0 && (
              <div className={styles.laws}>
                <h3>Laws</h3>
                {regulation.relatedLaws.map((law: any) => (
                  <div key={law.id} className={styles.law}>
                    <p><strong>{law.Section}</strong></p>
                    <p><strong>{law.title}</strong></p>
                    {law.relatedArticles && law.relatedArticles.length > 0 && (
                      <div className={styles.articles}>
                        {law.relatedArticles.map((article: any) => (
                          <div key={article.id} className={styles.article}>
                            {article.contentType == 3 && (
                              <pre className={styles.preformatted}>{article.content}</pre>
                            )}
                            {article.contentType != 3 && (
                              <p>{article.content}</p>
                            )}
                            {article.associatedImages && article.associatedImages.length > 0 && (
                              <div className={styles.images}>
                                <h5>Images</h5>
                                {article.associatedImages.map((image: any) => (
                                  <div key={image.id} className={styles.image}>
                                    <img src={`http://localhost:8080${image.url}`} alt={image.description} className={styles.imageThumb} />
                                    <p><strong>Description:</strong> {image.description}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No regulations found.</p>
      )}
    </div>
  );
};

export default ListView;
