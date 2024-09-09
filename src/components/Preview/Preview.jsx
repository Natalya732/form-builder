import React from "react";
import styles from "./Preview.module.css";
import InputControl from "../../components/InputControl/InputControl";
import Button from "components/Button/Button";
import { questionTypeEnum } from "utils/enums";
import TextareaControl from "components/TextareaControl/TextareaControl";

export default function Preview({ formState, onClose }) {
  console.log("preview,", formState);

  const renderQuestion = (question = {}) => {
    if (!question.title) return <div>No question provided</div>;
    if (question.type === questionTypeEnum.input)
      return (
        <div className={styles.customInputGroup}>
          <InputControl
            label={question.title}
            inputClass={styles.input}
            labelClass={styles.label}
            type={question.inputType}
            required={question.required}
          />
        </div>
      );
    if (question.type === questionTypeEnum.textarea)
      return (
        <div className={styles.customInputGroup}>
          <TextareaControl
            label={question.title}
            className={styles.textarea}
            labelClass={styles.label}
          />
        </div>
      );
    if (
      question.type === questionTypeEnum.radio ||
      question.type === questionTypeEnum.checkbox
    ) {
      return (
        <div className={styles.customInputGroup} key={question.id}>
          <div className={styles.radio}>
            <label className={styles.label}>{question.title}</label>
            {question.required ? <span>*</span> : ""}
          </div>
          <div className={styles.optionsList}>
            {question.options.map((item, index) => (
              <div className={styles.option}>
                <input
                  type={question.type}
                  id={`radio-${question.id}-${question.index}`}
                  className={styles.optionLabel}
                ></input>
                <label htmlFor={`radio-${question.id}-${index}`}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.formPreviewTitle}>Form Preview</div>
        <Button onClick={() => onClose()}>Close</Button>
      </div>
      <div className={styles.formOverlay}>
        <div className={styles.formContent}>
          <div className={styles.formHeader}>
            <h1>{formState.name || "Form Title"}</h1>
            <p>{formState.description || "Form Description"}</p>
          </div>
          <div className={styles.formBody}>
            {formState.questions.map(renderQuestion)}
          </div>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
}
