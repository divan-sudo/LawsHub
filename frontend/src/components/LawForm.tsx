import React, { useState, useEffect } from "react";
import { fetchLaws, createLaw } from "../api/api";
import styles from "./LawForm.module.css";

interface LawFormProps {
  regulationId: number;
  onAddLaw: (law: any) => void;
  onSelectLaw: (law: any) => void;
}

const LawForm: React.FC<LawFormProps> = ({
  regulationId,
  onAddLaw,
  onSelectLaw,
}) => {
  const [laws, setLaws] = useState<any[]>([]);
  const [newLaw, setNewLaw] = useState({
    section: "",
    title: "",
    regulationId,
  });
  const [selectedLaw, setSelectedLaw] = useState<any>(null);

  useEffect(() => {
    loadLaws();
  }, [regulationId]);

  const loadLaws = async () => {
    const laws = await fetchLaws(regulationId);
    setLaws(laws);
  };

  const handleLawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLaw({ ...newLaw, [e.target.name]: e.target.value });
  };

  const handleAddLaw = async () => {
    const law = await createLaw(newLaw);
    onAddLaw(law);
    setLaws([...laws, law]);
    setNewLaw({ section: "", title: "", regulationId });
    setSelectedLaw(law);
  };

  const handleSelectLaw = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = laws.find((l) => l.id === parseInt(e.target.value, 10));
    setSelectedLaw(selected);
    onSelectLaw(selected);
  };

  return (
    <div className={styles.container}>
      <h2>Create Law</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="section">Section Name</label>
        <input
          type="text"
          name="section"
          id="section"
          placeholder="Section Name"
          value={newLaw.section}
          onChange={handleLawChange}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="title">Law Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Law Title"
          value={newLaw.title}
          onChange={handleLawChange}
          required
        />
      </div>
      <button className={styles.button} onClick={handleAddLaw}>
        Add Law
      </button>

      <h2>Select Existing Law</h2>
      {laws.length > 0 ? (
        <select
          onChange={handleSelectLaw}
          value={selectedLaw ? selectedLaw.id : ""}
        >
          <option value="">Select a law</option>
          {laws.map((law) => (
            <option key={law.id} value={law.id}>
              {law.title}
            </option>
          ))}
        </select>
      ) : (
        <p>No laws available.</p>
      )}

      {selectedLaw && <p>Selected Law: {selectedLaw.title}</p>}
    </div>
  );
};

export default LawForm;
