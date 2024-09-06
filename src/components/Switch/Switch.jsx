import React from "react";
import styles from "./Switch.module.css";

const Switch = ({ label }) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label || ""}</p>
      <label className={styles.switch}>
        <input type="checkbox" />
        <span className={styles.slider} />
      </label>
    </div>
  );
};

export default Switch;
