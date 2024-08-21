import React from "react";
import styles from "./createForm.module.css";

export default function CreateForm() {
  return (
    <div className={styles.page}>
      <p className="bold-text lg">Create Form</p>
      <div className={styles.innerForm}>
        <div className={styles.customInputGroup}>
          <label className={styles.label}>Form Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Type here ..."
            autoFocus
          ></input>
        </div>
        <div className={styles.customInputGroup}>
          {" "}
          <label className={styles.label}>Form Description</label>
          <textarea
            className={styles.textarea}
            rows={8}
            autoFocus
            placeholder="Type Here ..."
          ></textarea>
        </div>
      </div>
     <p className="bold-text lg">Questions</p>
      <div className={styles.innerForm}>
        <div className={styles.customInputGroup}>
          <label className={styles.label}>Question</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Type here ..."
            autoFocus
          ></input>
        </div>
        <div className={styles.customInputGroup}>
          <label className={styles.label}>Question Type</label>
s        </div>
        </div>
    </div>
  );
}
