import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "react-feather";
import query from "utils/query";
import Button from "components/Button/Button";

export default function Home() {
  const navigate = useNavigate();

  // ********************************** Getting forms for current User *****************************************************
  const getFormOfUser = async () => {
    const forms = await query("/forms", undefined, "GET");

    if (forms) console.log("formsa re", forms);
  };

  useEffect(() => {
    localStorage.removeItem("formState");
    getFormOfUser();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.upperPage}>
        <div className={styles.title}>
          <h2>EASYFORMS</h2>
          <p className={styles.typed}>
            Create forms that engage and change ...{" "}
          </p>
          <Button onClick={() => navigate("/login")}>
            Get Started <ArrowRight />
          </Button>
        </div>
      </div>
      <div className={styles.lowerPage}>
        <div className={styles.header}>
          <h2 className={styles.heading}>All Projects</h2>
          <Button onClick={() => navigate("/create-form")}>Create form</Button>
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
