import React, { useEffect, useState } from "react";
import styles from "./Preview.module.css";
import InputControl from "../../components/InputControl/InputControl";
import Button from "components/Button/Button";
import { questionTypeEnum } from "utils/enums";
import TextareaControl from "components/TextareaControl/TextareaControl";
import query from "utils/query";
import Loader from "components/Loader/Loader";

export default function Preview({
  formState: formInitialData,
  onClose,
  formId,
}) {
  const [formState, setFormState] = useState(formInitialData || null);
  const [loading, setLoading] = useState(false);

  // ****************************** Get form By Id ********************************************

  useEffect(() => {
    const getFormQuery = async () => {
      if (!formId) return;
      setLoading(true);
      try {
        const res = await query("/forms/" + formId);
        setLoading(false);
        if (res) {
          setFormState(res);
        }
      } catch (err){
        console.error("tyhe error", err)
      }
    };

    getFormQuery();
  }, [formId]);

  const noQuestionsPresent =
    formState &&
    formState.questions.length <= 1 &&
    !formState.questions[0]?.title;

  const renderQuestion = (question = {}) => {
    if (noQuestionsPresent)
      return <div className="bold-text md mt-3">No questions provided ...</div>;
    if (question.type === questionTypeEnum.input)
      return (
        <div className={styles.customInputGroup} key={question.id}>
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
        <div className={styles.customInputGroup} key={question.id}>
          <TextareaControl
            label={question.title}
            className={styles.textarea}
            labelClass={styles.label}
            required={question.required}
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

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  if (!formState) return <div>No Form Available</div>;

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
          {!noQuestionsPresent && <Button>Submit</Button>}
        </div>
      </div>
    </div>
  );
}
