import React from "react";
import styles from "./Dialog.module.css";
import { X } from "react-feather";
import Button from "components/Button/Button";
export default function Dialog({ closeDialog, formId, onDelete }) {

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <h2>Delete Form</h2>
          <span onClick={() => closeDialog()}>
            <X />
          </span>
        </div>
        <div className={styles.dialogBody}>
          <p>Are you sure you want to delete this form?</p>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => {
              onDelete(formId);
              closeDialog();
            }}
          >
            Delete
          </Button>
          <Button cancelButton onClick={() => closeDialog()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
