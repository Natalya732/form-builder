import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";

import { handleNumericInputKeyDown } from "@/utils/util";
import { arrowDownIcon, arrowUpIcon, autoIcon } from "@/utils/svg";

import styles from "./InputControl.module.css";

const InputControl = forwardRef(
  (
    {
      small = false,
      subLabel,
      label,
      error,
      floatingError = false,
      textInsideInput,
      className,
      containerClassName,
      hintClassName,
      inputClass,
      password = false,
      hintText = "",
      icon,
      numericInput = false,
      value = "",
      disabled = false,
      onChange,
      preventChangeByDragging = false,
      containerStyles = {},
      showAuto = false,
      isAuto = false,
      inputStyles = {},
      ...props
    },
    ref
  ) => {
    let onChangeFunc = useRef(onChange);
    let mouseDetails = useRef({
      down: false,
      startX: 0,
      startY: 0,
      initialValue: NaN,
    });
    let inputVal = useRef(0);

    const [visible, setVisible] = useState(password ? false : true);
    const [autoActive, setAutoActive] = useState(showAuto && isAuto);

    const handleAutoChange = () => {
      if (disabled) return;

      const newAutoActive = !autoActive;
      if (onChange) {
        if (newAutoActive)
          onChange({
            target: {
              value: "auto",
            },
          });
        else
          onChange({
            target: {
              value: inputVal.current == "auto" ? 0 : inputVal.current,
            },
          });
      }

      setAutoActive(newAutoActive);
    };

    const handleNumericControlMouseDown = (event) => {
      if (preventChangeByDragging || disabled) return;

      mouseDetails.current.down = true;
      mouseDetails.current.startX = event.pageX;
      mouseDetails.current.startY = event.pageY;
      mouseDetails.current.initialValue = parseInt(inputVal.current) || 0;
    };

    const handleMouseUp = () => {
      mouseDetails.current.down = false;
    };

    const handleMouseMove = (event) => {
      if (!mouseDetails.current?.down) return;

      const y = event.pageY;

      let dy = mouseDetails.current?.startY - y;
      if (isNaN(dy)) return;
      if (Math.abs(dy) < 20) dy /= 2;
      // else if (Math.abs(dy) > 100) dy *= 1.5;

      const newValue = mouseDetails.current?.initialValue + parseInt(dy);
      const min = isNaN(props?.min) ? -1000 : props.min;
      const max = isNaN(props?.max) ? 1000 : props.max;

      if (
        newValue >= min &&
        newValue <= max &&
        typeof onChangeFunc.current == "function"
      ) {
        inputVal.current = newValue;
        onChangeFunc.current({
          target: {
            value: newValue,
          },
        });
      }
    };

    const handleControlIconClick = (icon = "up") => {
      const newVal =
        icon == "up"
          ? parseInt(inputVal.current) + 1
          : icon == "down"
          ? parseInt(inputVal.current) - 1
          : "";

      if (isNaN(newVal) || newVal < props.min || newVal > props.max) return;

      inputVal.current = newVal;
      if (onChange)
        onChange({
          target: {
            value: newVal,
          },
        });
    };

    useEffect(() => {
      if (!isNaN(value) || !isNaN(props?.defaultValue)) {
        inputVal.current = isNaN(value) ? props?.defaultValue : value;
      }

      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    useEffect(() => {
      onChangeFunc.current = onChange;
    }, [onChange]);

    useEffect(() => {
      if (value !== undefined && value !== inputVal.current)
        inputVal.current = value;
    }, [value]);

    useEffect(() => {
      setAutoActive(showAuto && isAuto);
    }, [isAuto]);

    const inputBox = (
      <div
        className={`${styles.inputContainer} ${styles.basicInput} ${
          error ? styles.basicInputError : ""
        } ${className || ""}`}
      >
        {showAuto ? (
          <div
            className={`${styles.auto} ${autoActive ? styles.activeAuto : ""}`}
            onClick={handleAutoChange}
          >
            {/* {autoIcon} */}
            auto
          </div>
        ) : (
          ""
        )}
        {textInsideInput && <p className={styles.text}>{textInsideInput}</p>}
        <input
          className={`${inputClass || ""} ${
            password ? styles.passwordInput : ""
          } `}
          type={
            numericInput && !autoActive
              ? "number"
              : visible
              ? "text"
              : "password"
          }
          onWheel={(event) => (numericInput ? event.target.blur() : "")}
          style={{
            paddingLeft: textInsideInput ? "0px" : "",
            ...inputStyles,
          }}
          ref={ref}
          onKeyDown={(event) =>
            numericInput ? handleNumericInputKeyDown(event) : ""
          }
          onPaste={(event) => {
            const text = event.clipboardData.getData("text");
            if (isNaN(parseInt(text)) && numericInput) event.preventDefault();
          }}
          onChange={(event) => {
            inputVal.current = event.target.value;

            if (onChange) onChange(event);
          }}
          value={autoActive ? "auto" : value || undefined}
          disabled={autoActive ? true : disabled}
          {...props}
        />

        {numericInput && !preventChangeByDragging && !autoActive ? (
          <div
            className={styles.numericControl}
            onMouseDown={handleNumericControlMouseDown}
          >
            <div
              className={`${styles.controlIcon} ${styles.up}`}
              onClick={() => handleControlIconClick("up")}
            >
              {arrowUpIcon}
            </div>
            <div
              className={`${styles.controlIcon} ${styles.down}`}
              onClick={() => handleControlIconClick("down")}
            >
              {arrowDownIcon}
            </div>
          </div>
        ) : password ? (
          <div className={styles.eye} onClick={() => setVisible(!visible)}>
            {visible ? <Eye /> : <EyeOff />}
          </div>
        ) : icon ? (
          <div className={styles.icon}>{icon}</div>
        ) : (
          ""
        )}
      </div>
    );

    return (
      <div
        className={`${styles.container}  ${small ? styles.smallInput : ""} ${
          containerClassName || ""
        }`}
        style={typeof containerStyles == "object" ? { ...containerStyles } : {}}
      >
        {label && (
          <label className={styles.label}>
            {label}
            <span> {subLabel}</span>
          </label>
        )}

        {inputBox}
        {hintText ? (
          <p className={`${styles.hint} ${hintClassName || ""}`}>{hintText}</p>
        ) : (
          ""
        )}

        {error ? (
          <p
            className={`${styles.errorMsg} ${
              floatingError ? styles.floatingError : ""
            }`}
          >
            {error}
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }
);

export default InputControl;