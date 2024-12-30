import React, { useEffect, useState } from "react";
import styles from "./Preview.module.css";
import InputControl from "../../components/InputControl/InputControl";
import Button from "components/Button/Button";
import { questionTypeEnum } from "utils/enums";
import TextareaControl from "components/TextareaControl/TextareaControl";
import query from "utils/query";
import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Preview({
  formState: formInitialData,
  onClose,
  formId,
  submission,
}) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(formInitialData || null);
  const [answers, setAnswers] = useState([]);
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
      } catch (err) {
        console.error("type error", err);
      }
    };

    getFormQuery();
  }, [formId]);

  useEffect(() => setAnswers(submission.answers), [submission]);

  const submitMutation = async () => {
    setLoading(true);
    const res = await query("/submissions", { formId, answers });
    setLoading(false);
    if (!res) {
      toast.error("An Error Occured !");
    }
    toast.success("Successfully Submitted");
    navigate("/user");
  };

  const noQuestionsPresent = formState && formState.questions.length === 0;

  const handleCheckboxChange = (val, questionId) => {
    const { type, value, checked } = val;

    const existingAnswer = answers.find(
      (item) => item.questionId === questionId
    );
    if (type === "checkbox") {
      if (!existingAnswer) {
        setAnswers((prev) => [...prev, { questionId, answer: [value] }]);
      } else {
        setAnswers((prev) => {
          const updatedAnswer = !checked
            ? {
                ...existingAnswer,
                answer: existingAnswer.answer.filter((it) => it !== value),
              }
            : {
                ...existingAnswer,
                answer: [...existingAnswer.answer, value],
              };

          return prev.map((item) =>
            item === existingAnswer ? updatedAnswer : item
          );
        });
      }
    }

    if (type === "radio") {
      if (!existingAnswer) {
        setAnswers((prev) => [...prev, { questionId, answer: value }]);
      } else {
        const updatedAnswer = checked
          ? { ...existingAnswer, answer: value }
          : { ...existingAnswer, answer: "" };

        setAnswers((prev) =>
          prev.map((item) => (item === existingAnswer ? updatedAnswer : item))
        );
      }
    }
  };

  const handleChange = (val, questionId) => {
    const newArr = [...answers];

    const index = newArr.findIndex((item) => item.questionId === questionId);

    if (index !== -1) {
      newArr[index].answer = val;
    } else {
      newArr.push({ questionId, answer: val });
    }

    setAnswers(newArr);
  };

  const renderQuestion = (question = {}) => {
    if (noQuestionsPresent)
      return <div className="bold-text md mt-3">No questions provided ...</div>;

    if (question.type === questionTypeEnum.input)
      return (
        <div className={styles.customInputGroup} key={question.id}>
          <InputControl
            label={question.title}
            readOnly={submission}
            inputClass={styles.input}
            labelClass={styles.label}
            type={question.inputType}
            required={question.required}
            onChange={(e) => handleChange(e.target.value, question._id)}
            value={
              answers.find((item) => item.questionId === question._id)?.answer
            }
          />
        </div>
      );
    if (question.type === questionTypeEnum.textarea)
      return (
        <div className={styles.customInputGroup} key={question.id}>
          <TextareaControl
            label={question.title}
            readOnly={submission}
            className={styles.textarea}
            labelClass={styles.label}
            required={question.required}
            onChange={(e) => handleChange(e.target.value, question._id)}
            value={
              answers.find((item) => item.questionId === question._id)?.answer
            }
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
                  name={`radio-${question.id}-${question.index}`}
                  className={styles.optionLabel}
                  value={item}
                  checked={
                    answers
                      .find((item) => item.questionId === question._id)
                      ?.answer.includes(item) ||
                    answers.find((item) => item.questionId === question._id)
                      ?.answer === item
                  }
                  onChange={(e) => {
                    submission
                      ? console.log("cannot change value, already submitted")
                      : handleCheckboxChange(e.target, question._id);
                  }}
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
          {!noQuestionsPresent && formId && !submission && (
            <Button onClick={() => submitMutation()}>Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
}
