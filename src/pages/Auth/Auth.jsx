import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import InputControl from "../../components/InputControl/InputControl";
import { useNavigate } from "react-router-dom";
import query from "../../utils/query";
import { toast } from "react-hot-toast";
import Button from "components/Button/Button";

export default function Auth({ isSigned = false }) {
  const navigate = useNavigate();
  const newState = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };
  const [state, setState] = useState(newState);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const switchOptions = {
    login: (
      <div>
        New ? <a onClick={() => navigate("/signup")}>Create and account</a>
      </div>
    ),
    signup: (
      <div>
        Already a user? <a onClick={() => navigate("/login")}>Login</a>
      </div>
    ),
  };

  // ************************************* Integration Part ********************************

  const signupMutation = async () => {
    if (submitting) return;

    setSubmitting(true);
    const user = await query("/users/signup", JSON.stringify(state));
    setSubmitting(false);
    if (!user) return;

    toast.success("Signed up successfully");
    console.log(user);
  };

  const loginMutation = async () => {
    if (submitting) return;
    const payload = {
      email: state.email,
      password: state.password,
    };
    setSubmitting(true);

    const response = await query("/users/login", JSON.stringify(payload));
    if (response) {
      setSubmitting(false);
      toast.success("Logged in Successfully");
      localStorage.setItem("token", JSON.stringify(response.token))
      navigate("/")
      setTimeout(() => {
        window.scrollTo({
            top: window.innerHeight, // Scroll to 100vh
            behavior: 'smooth' // Smooth scrolling
        });
    }, 100)
    }
    setSubmitting(false);
    return response;
  };

  // ******************************************* Functions ***********************************************

  const validateForm = () => {
    const errors = {};

    if (isSigned) {
      if (!state.email) errors.email = "Enter email";
      else if (
        !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          state.email
        )
      )
        errors.email = "Invalid email";
      if (!state.password) errors.password = "Enter password";
    } else {
      if (!state.email) errors.email = "Enter email";
      else if (
        !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          state.email
        )
      )
        errors.email = "Invalid email";
      if (!state.password) errors.password = "Enter password";
      if (!state.name) errors.name = "Enter name";
      if (!state.phone) errors.phone = "Enter Phone";
      else if (state.phone.length > 10) {
        errors.phone = "Phone number must be of 10 digits";
      }
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (isSigned) {
      loginMutation();
    } else {
      signupMutation();
    }
  };

  const handleChange = (e, name) => {
    setState((prev) => ({ ...prev, [name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    setState(newState);
  }, [isSigned]);

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
              label="Full Name"
              autofocus
              inputClass={styles.input}
              value={state.name}
              onChange={(e) => handleChange(e, "name")}
              error={errors?.name}
            />
          </div>
        )}
        <div className={styles.customInput}>
          <InputControl
            label="Email"
            autofocus
            type="email"
            inputClass={styles.input}
            value={state.email}
            onChange={(e) => handleChange(e, "email")}
            error={errors?.email}
          />
        </div>
        {!isSigned && (
          <div className={styles.customInput}>
            <InputControl
              label="Phone"
              autofocus
              type="number"
              inputClass={styles.input}
              value={state.phone}
              onChange={(e) => handleChange(e, "phone")}
              error={errors?.phone}
            />
          </div>
        )}
        <div className={styles.customInput}>
          <InputControl
            label="Password"
            autofocus
            password
            inputClass={styles.input}
            value={state.password}
            onChange={(e) => handleChange(e, "password")}
            error={errors?.password}
          />
        </div>

        {/* <input type="checkbox" />
        <div>I have read and accept terms and conditions</div>
         */}
        <div className={styles.buttonContainer}>
          <Button
            disabled={submitting}
            onClick={handleSubmit}
            useSpinnerWhenDisabled
          >
            {!isSigned ? "Sign up" : "Login"}
          </Button>
          <Button cancelButton onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>

        <div className={styles.switching}>
          {isSigned ? switchOptions.login : switchOptions.signup}
        </div>
      </div>
    </div>
  );
}
