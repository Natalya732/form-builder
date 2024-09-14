import React, { useState } from "react";
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
import Loader from "components/Loader/Loader";

export default function CreateForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const newState = {
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
  };
  const [formState, setFormState] = useState(newState);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    questions: [],
  });

  // *************************************************** Functions **************************************************
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

    if (question.type === questionTypeEnum.input && !question.inputType) {
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

  // *************************************************************** Create Form Integration ***************************************************************

  const handleSubmit = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      toast.error("Form Validation failed");
      return;
    }
    const res = await query("/forms", formState);
    if (!res) {
      setLoading(false);
      toast.error("An error occured !");
      return;
    }
    setLoading(false);
    setFormState(newState);
    navigate("/user");
    toast.success("Successfully Created!");
  };

  return (
    <div className={styles.page}>
      <div className={styles.questionHeader}>
        <div className={styles.headingGradient}>CREATE FORM</div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button onClick={() => navigate("/user")}>View Profile</Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button onClick={() => setShowPreview(true)}>Preview Form</Button>
        </div>
      </div>
      {showPreview && (
        <Preview formState={formState} onClose={() => setShowPreview(false)} />
      )}
      {loading ? (
        <div
        className={styles.loadingDiv}
        >
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.innerForm}>
            <h2>Basic Form Info</h2>
            <div className={styles.customInputGroup}>
              <InputControl
                label="Form Name"
                autoFocus
                inputClass={styles.input}
                value={formState.name}
                error={errors?.name}
                onChange={(e) => {
                  setFormState((prev) => ({ ...prev, name: e.target.value }));
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
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
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                  setErrors((prev) => ({ ...prev, description: "" }));
                }}
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
              onChange={(data, errors) => {
                setFormState((prev) => ({
                  ...prev,
                  questions: prev.questions.map((q, i) =>
                    i === index ? data : q
                  ),
                }));
                setErrors((prevErr) => ({
                  ...prevErr,
                  questions: prevErr.questions.map((q, i) =>
                    i === index ? errors : q
                  ),
                }));
              }}
            />
          ))}
          <div className={styles.innerForm}>
            <p className={styles.addLink} onClick={handleAddition}>
              Add new Question +{" "}
            </p>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            useSpinnerWhenDisabled
          >
            Submit Form
          </Button>
        </>
      )}
    </div>
  );
}
