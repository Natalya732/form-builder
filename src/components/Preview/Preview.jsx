import React from "react";
import styles from "./Preview.module.css";
import { useNavigate } from "react-router-dom";
import InputControl from "../../components/InputControl/InputControl";

export default function Preview({ formState, onClose }) {
  const text =
    formState.description ||
    "this is form description what has been written here . I am not gettng why the";
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p onClick={() => onClose()}>{"<< Back"}</p>
        <h2>Form Preview</h2>
      </div>
      <div className={styles.formOverlay}>
        <div className={styles.formContent}>
          <div className={styles.formHeader}>
            <h1>{formState.name || "Form Title"}</h1>
            <p>{text}</p>
          </div>
          
          <div className={styles.customInputGroup}>
            <InputControl inputClass={styles.input} label="First Name" />
          </div>
        </div>
      </div>
    </div>
  );
}
