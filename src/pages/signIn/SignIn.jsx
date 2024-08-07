import React from "react";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className="container">
        Sign In Page not ready yet.
        <p className="bold-text md link" onClick={() => navigate("/dashboard")}>
          Move to Dashboard ?{" "}
        </p>
      </div>
    </div>
  );
}
