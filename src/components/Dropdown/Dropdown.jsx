import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown({
  dropdownClass,
  containerClassName,
  label,
  labelClass,
  error,
  options,
  selectedOption,
  handleSelected
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleSelectClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    handleSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownComponent = (
    <div ref={dropdownRef} className={`${styles.dropdown} ${dropdownClass}`}>
      <div
        className={`${styles.select} ${isOpen ? styles["select-clicked"] : ""}`}
        onClick={handleSelectClick}
      >
        <span className={styles.selected}>{selectedOption?.name}</span>
        <div
          className={`${styles.caret} ${isOpen ? styles["caret-rotate"] : ""}`}
        ></div>
      </div>
      <ul className={`${styles.menu} ${isOpen ? styles["menu-open"] : ""}`}>
        {options?.length ? options?.map((option, index) => (
          <li
            key={index}
            className={option === selectedOption ? styles.active : ""}
            onClick={() => handleOptionClick(option)}
          >
            {option?.name}
          </li>
        )) : "No Options Available"}
      </ul>
    </div>
  );

  return (
    <div className={`${styles.container} ${containerClassName}`}>
      {label && <label className={`${styles.label} ${labelClass}`}>{label}</label>}
      {dropdownComponent}
      {error ? <p className={`${styles.errorMsg}`}>{error}</p> : ""}
    </div>
  );
}
