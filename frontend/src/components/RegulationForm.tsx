import React, { useState, useEffect } from "react";
import { fetchRegulations, createRegulation } from "../api/api";
import styles from "./RegulationForm.module.css";

interface RegulationProps {
  onSelect: (regulation: any) => void;
}

const RegulationForm: React.FC<RegulationProps> = ({ onSelect }) => {
  const [regulations, setRegulations] = useState<any[]>([]);
  const [newRegulation, setNewRegulation] = useState({
    countryIso2: "",
    name: "",
    description: "",
    lastUpdateNote: "",
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    loadRegulations();
  }, []);

  const loadRegulations = async () => {
    const regs = await fetchRegulations();
    setRegulations(regs);
  };

  const handleRegulationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRegulation({ ...newRegulation, [e.target.name]: e.target.value });
  };

  const validateRegulationForm = () => {
    const errors: string[] = [];
    if (!newRegulation.countryIso2) errors.push("Country is required.");
    if (!newRegulation.name) errors.push("Name is required.");
    if (!newRegulation.description) errors.push("Description is required.");
    if (!newRegulation.lastUpdateNote)
      errors.push("Last Update Note is required.");
    return errors;
  };

  const handleAddRegulation = async () => {
    const errors = validateRegulationForm();
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }
    const regulation = await createRegulation(newRegulation);
    setRegulations([...regulations, regulation]);
    setFormErrors([]);
    setNewRegulation({
      countryIso2: "",
      name: "",
      description: "",
      lastUpdateNote: "",
    });
    onSelect(regulation);
  };

  return (
    <div className={styles.container}>
      <h2>Create or Edit Regulation</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="countryIso2">Country Code</label>
        <input
          type="text"
          name="countryIso2"
          id="countryIso2"
          placeholder="Country"
          value={newRegulation.countryIso2}
          onChange={handleRegulationChange}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Regulation Name"
          value={newRegulation.name}
          onChange={handleRegulationChange}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Regulation Description"
          value={newRegulation.description}
          onChange={handleRegulationChange}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="lastUpdateNote">Last Update</label>
        <input
          type="text"
          name="lastUpdateNote"
          id="lastUpdateNote"
          placeholder="Last Update Note"
          value={newRegulation.lastUpdateNote}
          onChange={handleRegulationChange}
          required
        />
      </div>
      <button className={styles.button} onClick={handleAddRegulation}>
        Add Regulation
      </button>

      <h2>Select Existing Regulation</h2>
      {regulations.length > 0 ? (
        <select
          onChange={(e) =>
            onSelect(
              regulations.find((r) => r.id === parseInt(e.target.value, 10))
            )
          }
          value=""
        >
          <option value="">Select a regulation</option>
          {regulations.map((regulation) => (
            <option key={regulation.id} value={regulation.id}>
              {regulation.name}
            </option>
          ))}
        </select>
      ) : (
        <p>No regulations available.</p>
      )}

      {formErrors.length > 0 && (
        <div className={styles.errorList}>
          {formErrors.map((error, index) => (
            <p key={index} className={styles.errorText}>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegulationForm;
