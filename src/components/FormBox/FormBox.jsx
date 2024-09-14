import React from "react";
import styles from "./FormBox.module.css";
import { Trash2 } from "react-feather";
export default function FormBox({ data, index, handleDialog }) {
  console.log("data si", data._id)
  return (
    <div className={styles.box} key={index}>
      <div className={styles.content}>
        <div className={styles.formboxHeader}>
          <h2>{data?.name}</h2>
          <span onClick={() => handleDialog(data?._id)}>
            <Trash2 />
          </span>
        </div>
        <p className={styles.description}>{data?.description}</p>
        <div className={styles.inlineText}>
          <p>Questions : </p>
          <p className="bold-text">5</p>
        </div>

        <div className={styles.inlineText}>
          <p>Submissions : </p>
          <p className="bold-text">{data?.submissionCount}</p>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.inactiveButton}>Edit</button>
          <button className={styles.submitButton}>Submission</button>
        </div>
      </div>
    </div>
  );
}
