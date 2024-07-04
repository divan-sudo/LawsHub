import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RegulationForm from "../components/RegulationForm";
import LawForm from "../components/LawForm";
import ArticleForm from "../components/ArticleForm";
import ImageForm from "../components/ImageForm";
import styles from "./RegulationPage.module.css";

const RegulationPage: React.FC = () => {
  const [selectedRegulation, setSelectedRegulation] = useState<any>(null);
  const [selectedLaw, setSelectedLaw] = useState<any>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const navigate = useNavigate();

  const handleSelectRegulation = (regulation: any) => {
    setSelectedRegulation(regulation);
    setSelectedLaw(null);
    setSelectedArticle(null);
  };

  const handleAddLaw = (law: any) => {
    setSelectedLaw(law);
  };

  const handleAddArticle = (article: any) => {
    setSelectedArticle(article);
  };

  const handleFinish = () => {
    navigate("/list");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ControlHUB</h1>

      <nav className={styles.nav}>
        <Link to="/list" className={styles.link}>
          View List
        </Link>
      </nav>

      <RegulationForm onSelect={handleSelectRegulation} />
      {selectedRegulation && (
        <>
          <p>Selected Regulation: {selectedRegulation.name}</p>
          <LawForm
            regulationId={selectedRegulation.id}
            onAddLaw={handleAddLaw}
            onSelectLaw={setSelectedLaw}
          />

          {selectedLaw && (
            <ArticleForm
              lawId={selectedLaw.id}
              onAddArticle={handleAddArticle}
              onSelectArticle={setSelectedArticle}
            />
          )}

          {selectedArticle && <ImageForm lawId={selectedLaw.id} />}
        </>
      )}

      <button className={styles.finishButton} onClick={handleFinish}>
        List View
      </button>
    </div>
  );
};

export default RegulationPage;
