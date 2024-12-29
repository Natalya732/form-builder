import React from "react";
import styles from "./Switch.module.css";

const Switch = ({ label, isToggled, onToggle }) => {
  return (
    <div className={styles.container}>
      <p>{label || ""}</p>
      <label className={styles.switch}>
        <input type="checkbox" checked={isToggled} onChange={onToggle}/>
        <span className={styles.slider} />
      </label>
    </div>
  );
};

export default Switch;
