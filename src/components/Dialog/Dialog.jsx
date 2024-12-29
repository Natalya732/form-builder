import React from "react";
import styles from "./Dialog.module.css";
import { X } from "react-feather";
import Button from "components/Button/Button";
export default function Dialog({ closeDialog, dialogDetails, isDeleteDialog }) {
 
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <h2>{dialogDetails.title}</h2>
          <span onClick={() => closeDialog()}>
            <X />
          </span>
        </div>
        <div className={styles.dialogBody}>
          <p>{dialogDetails.description}</p>
        </div>
        <div className={styles.buttonContainer}>
          {isDeleteDialog && (
            <Button
              onClick={() => {
                dialogDetails.handleDelete(dialogDetails.formId);
                closeDialog();
              }}
            >
              Delete
            </Button>
          )}
          <Button cancelButton onClick={() => closeDialog()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
