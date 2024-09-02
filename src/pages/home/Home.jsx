import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "react-feather";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("formState");
  }, []);
  return (
    <div className={styles.page}>
      <div className={styles.upperPage}>
        <div className={styles.title}>
          <h2>EASYFORMS</h2>
          <p className={styles.typed}>
            Create forms that engage and change ...{" "}
          </p>
          <button className={styles.button} onClick={() => navigate("/login")}>
            Get Started <ArrowRight />
          </button>
        </div>
      </div>
      <div className={styles.lowerPage}>
        <div className={styles.header}>
          <h2 className={styles.heading}>All Projects</h2>
          <button
            className={styles.button}
            onClick={() => navigate("/create-form")}
          >
            Create form
          </button>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.box}>
            <div className={styles.content}>
              <h2>This is form heading</h2>
              <p className={styles.description}>
                This is some description of above heading which is aashu's form.
                and has been written with love
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
        </div>
      </div>
    </div>
  );
}
