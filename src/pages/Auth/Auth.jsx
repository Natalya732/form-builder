import React, { useState } from "react";
import styles from "./Auth.module.css";
import InputControl from "../../components/InputControl/InputControl";
import { useNavigate } from "react-router-dom";

export default function Auth({ isSigned = false }) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const switchOptions = {
  login : (
    <div>
      New ? <a onClick={()=> navigate("/signup")}>Create and account</a>
    </div>
  ),
  signup : (
    <div>
      Already logged in? <a onClick={()=> navigate("/login")}>Login</a>
    </div>
  )
  };

  const handleSubmit = () => {
    Object.keys(state).forEach((item) => {
      if (state[item].trim() === "") {
        setErrors((prev) => ({
          ...prev,
          [item]: `${item} is a required field`,
        }));
        return;
      }
    });
    if (errors?.length) {
      return;
    }
  };

  const handleChange = (e, name) => {
    setState((prev) => ({ ...prev, [name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div onClick={() => navigate("/")} className={styles.back}>
          {"< Back to Home"}
        </div>
        <h2> {!isSigned ? "Sign Up" : "Login"}</h2>
        {!isSigned && (
          <div className={styles.customInput}>
            <InputControl
              label="Name"
              autofocus
              inputClass={styles.input}
              value={state?.name}
              onChange={(e) => handleChange(e, "name")}
              error={errors?.name}
            />
          </div>
        )}
        <div className={styles.customInput}>
          <InputControl
            label="Email"
            autofocus
            type="Email"
            inputClass={styles.input}
            value={state?.email}
            onChange={(e) => handleChange(e, "email")}
            error={errors?.email}
          />
        </div>
        <div className={styles.customInput}>
          <InputControl
            label="Password"
            autofocus
            password
            inputClass={styles.input}
            value={state?.password}
            onChange={(e) => handleChange(e, "password")}
            error={errors?.password}
          />
        </div>
        {!isSigned && (
          <div className={styles.customInput}>
            <InputControl
              label="Phone"
              autofocus
              type="number"
              inputClass={styles.input}
              value={state?.phone}
              onChange={(e) => handleChange(e, "phone")}
              error={errors?.phone}
            />
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleSubmit}>
            {!isSigned ? "Sign up" : "Login"}
          </button>
          <button className={`${styles.button}`} onClick={()=> navigate("/")}>Cancel</button>
        </div>

        <div className={styles.switching}>
          {isSigned ? switchOptions.login : switchOptions.signup}
        </div>
      </div>
    </div>
  );
}
