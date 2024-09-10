import React from "react";
import styles from "./User.module.css";
import { Camera, LogOut } from "react-feather";
import InputControl from "components/InputControl/InputControl";
import Button from "components/Button/Button";
import FormBox from "components/FormBox/FormBox";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span>
          Welcome <p className={styles.title}>Nikita Pandey</p>
        </span>
        <p>
          <LogOut /> Logout
        </p>
      </div>
      <div className={styles.userInfo}>
        <h2>Your Profile</h2>
        <div className={styles.userDetails}>
          <div className={styles.userInfoLeft}>
            <span>
              <label htmlFor="file-upload">
                <Camera />
              </label>
              <input type="file" id="file-upload"/>
            </span>
          </div>
          <div className={styles.userInfoRight}>
            <InputControl label="Name" autoFocus inputClass={styles.input} />
            <InputControl label="Email" autoFocus inputClass={styles.input} />
            <InputControl label="Phone" autoFocus inputClass={styles.input} />
            <InputControl label="Address" autoFocus inputClass={styles.input} />
            <Button>Save</Button>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.userForms}>
        <div className={styles.formHeader}>
          <h2>Your forms</h2>
          <Button onClick={() => navigate("/create-form")}>Add Form</Button>
        </div>
        <div className={styles.formContainer}>
          <FormBox />
          <FormBox />
          <FormBox />
        </div>
      </div>
    </div>
  );
}
