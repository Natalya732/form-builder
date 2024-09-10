import React, { useEffect, useState } from "react";
import styles from "./createForm.module.css";
import InputControl from "../../components/InputControl/InputControl";
import TextareaControl from "../../components/TextareaControl/TextareaControl";
import Preview from "../../components/Preview/Preview";
import Button from "components/Button/Button";
import { questionTypeEnum } from "utils/enums";
import EditQuestion from "components/EditQuestion/EditQuestion";
import query from "utils/query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    questions: [
      {
        id: Date.now(),
        title: "",
        type: "",
        inputType: "",
        multiple: "",
        options: [],
        required: false,
      },
    ],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    questions: [],
  });

  // *************************************************** integration **************************************************
  const handleAddition = () => {
    setFormState((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: Date.now(),
          title: "",
          type: "",
          num: "",
          multiple: "",
          options: [],
        },
      ],
    }));
  };

  const handleDelete = (id, index) => {
    if (index === 0) {
      toast.error("At least one question is required");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      questions: prev.questions.filter((itm) => itm.id !== id),
    }));
  };

  function validateQuestion(question = {}) {
    const errors = {};

    if (!question.title) errors.title = "Title required";
    if (!question.type) errors.type = "Type required";

    if (question.type === questionTypeEnum.input || !question.inputType) {
      errors.inputType = "Select type of input field";
    }
    if (
      question.type === questionTypeEnum.radio ||
      question.type === questionTypeEnum.checkbox
    ) {
      if (!question.options?.length)
        errors.option = "Please add at least one option";
    }

    return { valid: Object.keys(errors).length ? false : true, errors };
  }

  const validateForm = () => {
    const errors = {};

    // Validate top-level fields
    if (!formState.name.trim())
      errors.name = "Name of Form is a required field.";
    if (!formState.description.trim())
      errors.description = "Description of Form is a required field.";

    // Validate questions
    const questionsErrors = formState.questions.map(
      (q) => validateQuestion(q).errors
    );

    // Check if there are any errors
    const hasErrors =
      Object.keys(errors).length ||
      questionsErrors.some((e) => Object.keys(e).length);

    if (hasErrors) {
      setErrors({ ...errors, questions: questionsErrors });
      return false;
    } else {
      setErrors({ questions: [] });
      return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("validation failed");
      return;
    }
    const res = await query("/forms", formState);
    console.log("response", res);
  };

  return (
    <div className={styles.page}>
      <div className={styles.questionHeader}>
        <h1>CREATE FORM</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button onClick={() => navigate("/user")}>Cancel</Button>
          <Button onClick={() => setShowPreview(true)}>Preview Form</Button>
        </div>
      </div>
      {showPreview && (
        <Preview formState={formState} onClose={() => setShowPreview(false)} />
      )}
      <div className={styles.innerForm}>
        <h2 style={{ color: "white" }}>Basic Form Info</h2>
        <div className={styles.customInputGroup}>
          <InputControl
            label="Form Name"
            autoFocus
            inputClass={styles.input}
            value={formState.name}
            error={errors?.name}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className={styles.customInputGroup}>
          <TextareaControl
            label="Form Description"
            autoFocus
            rows={4}
            columns={6}
            value={formState.description}
            error={errors?.description}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
      </div>
      {formState.questions.map((question, index) => (
        <EditQuestion
          key={question.id}
          questionData={question}
          errors={errors?.questions[index]}
          handleDelete={handleDelete}
          index={index}
          onChange={(data) => {
            console.log("data", data);
            setFormState((prev) => ({
              ...prev,
              questions: prev.questions.map((q, i) => (i === index ? data : q)),
            }));
          }}
        />
      ))}
      <div className={styles.innerForm}>
        <p className={styles.addLink} onClick={handleAddition}>
          Add new Question +{" "}
        </p>
      </div>
      <Button onClick={handleSubmit}>Submit Form</Button>
    </div>
  );
}
