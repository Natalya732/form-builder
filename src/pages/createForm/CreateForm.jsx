import React, { useEffect, useState } from "react";
import styles from "./createForm.module.css";
import InputControl from "../../components/InputControl/InputControl";
import TextareaControl from "../../components/TextareaControl/TextareaControl";
import Question from "../../components/Question/Question";
import Preview from "../../components/Preview/Preview";
import Button from "components/Button/Button";

export default function CreateForm() {
  const [showPreview, setShowPreview] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    questionInfo: [
      {
        id: Date.now(),
        title: "",
        type: "",
        inputType: "",
        optionsNumber: "",
        multiple: "",
        options: [],
      },
    ],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    questionInfo: [],
  });

  const handleAddition = () => {
    setFormState((prev) => ({
      ...prev,
      questionInfo: [
        ...prev.questionInfo,
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

  const handleDelete = (item, index) => {
    if (index === 0) return;
    setFormState((prev) => ({
      ...prev,
      questionInfo: prev.questionInfo.filter((itm) => itm.id !== item.id),
    }));
  };

  const handleChange = (e, index, name, optionArrIndex) => {
    setFormState((prev) => {
      //Create a deep copy of questions Array to avoid direct mutations
      const updatedArray = [...prev.questionInfo];

      //Update the specific question object at the given index
      const updatedQuestion = { ...updatedArray[index] };

      switch (name) {
        case "type":
          updatedQuestion[name] = e.value;
          updatedQuestion.options = [];
          updatedQuestion.optionsNumber = "";
          break;

        case "inputType":
        case "multiple":
          updatedQuestion[name] = e.value;
          break;

        case "options":
          if (!updatedQuestion.options) {
            updatedQuestion.options = [];
          }
          updatedQuestion.options.push(e);
          break;

        case "optionArr":
          if (!updatedQuestion.options) {
            updatedQuestion.options = [];
          }
          updatedQuestion.options[optionArrIndex] = e.target.value;
          break;

        default:
          updatedQuestion[name] = e.target.value;
          errors[name] = "";
          break;
      }

      updatedArray[index] = updatedQuestion;

      return {
        ...prev,
        questionInfo: updatedArray,
      };
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formState.name) errors.name = "Name of Form is required field";
    if (!formState.description)
      errors.description = "Description of Form is required field";

    if (Object.keys(errors).length) {
      setErrors(errors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };
  const handleSubmit = () => {
    if (!validateForm()){
      console.log("validation failed")
      return;}
    console.log("validation success");
  };
console.log("errors", errors)
  useEffect(() => {
    localStorage.setItem("formState", JSON.stringify(formState));
  }, [formState]);

  return (
    <div className={styles.page}>
      <div className={styles.questionHeader}>
        <h1>CREATE FORM</h1>
        <Button onClick={() => setShowPreview(true)}>
          Preview Form
        </Button>
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

      <Question
        formState={formState}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />

      <div className={styles.innerForm}>
        <p className={styles.addLink} onClick={handleAddition}>
          Add new Question +{" "}
        </p>
      </div>
    <Button onClick={handleSubmit}>
        Submit Form
      </Button>
    </div>
  );
}
