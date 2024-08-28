import React from "react";
import styles from "./TextareaControl.module.css";

export default function TextareaControl({
  value,
  className,
  onChange,
  rows,
  columns,
  label,
  error,
  ...props
}) {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        rows={rows}
        cols={columns}
        className={`${className} ${styles.basicTextarea}`}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error ? <p className={`${styles.errorMsg}`}>{error}</p> : ""}
    </div>
  );
}