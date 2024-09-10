import React from "react";
import styles from "./FormBox.module.css";
export default function FormBox() {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <h2>This is form heading</h2>
        <p className={styles.description}>
          This is some description of above heading which is aashu's form. and
          has been written with love
        </p>
        <div className={styles.inlineText}>
          <p>Questions : </p>
          <p className="bold-text">5</p>
        </div>

        <div className={styles.inlineText}>
          <p>Submissions : </p>
          <p className="bold-text">15</p>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.inactiveButton}>Edit</button>
          <button className={styles.submitButton}>Submission</button>
        </div>
      </div>
    </div>
  );
}
