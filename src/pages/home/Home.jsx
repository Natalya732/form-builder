import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "react-feather";
import query from "utils/query";
import Button from "components/Button/Button";
import FormBox from "components/FormBox/FormBox";

export default function Home() {
  const navigate = useNavigate();

  // ********************************** Getting forms for current User *****************************************************
  const getFormOfUser = async () => {
    const forms = await query("/forms", undefined, "GET");

    if (forms) console.log("formsa re", forms);
  };

  useEffect(() => {
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
        </div>
        <div className={styles.formContainer}>
          <FormBox />
        </div>
      </div>
    </div>
  );
}
