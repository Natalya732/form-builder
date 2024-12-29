import React from "react";
import { ArrowRight } from "react-feather";

import Spinner from "components/Spinner/Spinner"

import styles from "./Button.module.css";

const Button = ({
  className,
  style = {},
  thin = false,
  small = false,
  children,
  onClick,
  disabled = false,
  outlineButton,
  redButton,
  cancelButton,
  withArrow,
  useSpinnerWhenDisabled = false,
  whiteSpinner = false,
  tooltipText = "",
  ...rest
}) => {
  return (
    <button
      type={rest.type || "button"}
      onClick={(event) => (onClick ? onClick(event) : "")}
      disabled={disabled ? true : false}
      className={`${styles.button} ${
        outlineButton ? styles["button-outline"] : ""
      } ${disabled ? styles["button-disabled"] : ""} ${className || ""} ${
        disabled && outlineButton ? styles["outline-button-disabled"] : ""
      }
        ${redButton ? styles.buttonDelete : ""} 
        ${cancelButton ? styles["button-cancel"] : ""} ${
        thin ? styles.thin : ""
      } ${small ? styles.small : ""}`}
      style={style}
      aria-label={
        rest["aria-label"] ||
        `button ${
          typeof children === "string" ? children.toLowerCase().trim() : ""
        }`
      }
      {...rest}
    >
      {children}
      {useSpinnerWhenDisabled && disabled ? (
        <Spinner small secondaryColor={outlineButton} gray={disabled} />
      ) : withArrow ? (
        <ArrowRight className={styles.icon} />
      ) : (
        ""
      )}
    </button>
  );
};

export default Button;
