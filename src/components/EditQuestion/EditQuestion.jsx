import React, { useState, useEffect } from "react";
import InputControl from "../InputControl/InputControl";
import Dropdown from "../Dropdown/Dropdown";
import Switch from "components/Switch/Switch";
import { questionTypeEnum } from "utils/enums";
import styles from "./EditQuestion.module.css";

const options = [
  { name: "Input Field", value: questionTypeEnum.input },
  { name: "Textarea", value: questionTypeEnum.textarea },
  { name: "Radio Buttons", value: questionTypeEnum.radio },
  { name: "Checkboxes", value: questionTypeEnum.checkbox },
];

const inputOptions = [
  { name: "Text", value: "text" },
  { name: "Email", value: "email" },
  { name: "Date", value: "date" },
  { name: "Number", value: "number" },
  { name: "File", value: "file" },
  { name: "URL", value: "url" },
];

function EditQuestion({
  questionData = {},
  onChange,
  errors = {},
  index,
  handleDelete,
}) {
  
  const [values, setValues] = useState({
    options: [],
    ...questionData,
    title: questionData.title,
    type: questionData.type,
  });

  const [errorValues, setErrorValues] = useState({
    ...errors,
    title: errors.title,
    type: errors.type,
    inputType: errors.inputType,
    option: errors.option,
  });

  useEffect(() => {
    if (onChange) onChange(values, errorValues);
  }, [values, errorValues]);

  return (
    <div className={styles.question}>
      <div className={styles.questionHeader}>
        <h2>Question {index + 1}</h2>
        <p
          className={styles.deleteLink}
          onClick={() => handleDelete(questionData.id, index)}
        >
          Delete Question
        </p>
      </div>
      <div className={styles.customInputGroup}>
        <InputControl
          label="Question Title"
          autoFocus
          inputClass={styles.input}
          labelClass={styles.label}
          value={values.title}
          error={errors.title}
          onChange={(e) => {
            setValues((p) => ({ ...p, title: e.target.value }));
            setErrorValues((prev) => ({ ...prev, title: "" }));
          }}
        />
      </div>
      <div className={styles.customInputGroup} style={{ flex: "1" }}>
        <Dropdown
          label="Question Type"
          options={options}
          labelClass={styles.label}
          dropdownClass={styles.dropdown}
          error={errors.type}
          selectedOption={
            options.find((option) => option.value === values.type) || {
              name: "Select a Type",
              value: "",
            }
          }
          handleSelected={(option) => {
            setValues((p) => ({ ...p, type: option.value }));
            setErrorValues((p) => ({ ...p, type: "" }));
          }}
        />

        {values.type === questionTypeEnum.input ? (
          <div className={styles.customInputGroup} style={{ flex: "1" }}>
            <Dropdown
              label="Select type of Input Box"
              options={inputOptions}
              error={errors.inputType}
              selectedOption={
                inputOptions.find(
                  (option) => option.value === values.inputType
                ) || {
                  name: "Select a Type",
                  value: "",
                }
              }
              handleSelected={(option) => {
                setValues((p) => ({ ...p, inputType: option.value }));
                setErrorValues((p) => ({ ...p, inputType: "" }));
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {values.type === questionTypeEnum.radio ||
      values.type === questionTypeEnum.checkbox ? (
        <div className={styles.options}>
          {values.options.map((option, index) => (
            <div className={styles.option}>
              <p>{index + 1}.</p>
              <InputControl
                placeholder="Enter option"
                inputClass={styles.input}
                value={option}
                onChange={(e) => {
                  setValues((p) => ({
                    ...p,
                    options: p.options.map((item, i) =>
                      i === index ? e.target.value : item
                    ),
                  }));

                  setErrorValues((p) => ({ ...p, option: "" }));
                }}
              />
            </div>
          ))}

          <br />
          <div
            className={styles.addOption}
            onClick={() => {
              setValues((p) => ({ ...p, options: [...p.options, ""] }));
            }}
          >
            + Add option <p className={styles.errorMsg}>{errors.option}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={styles.required}>
        <Switch
          label="Required Field"
          isToggled={values.required}
          onToggle={() => setValues((p) => ({ ...p, required: !p.required }))}
        />
      </div>
    </div>
  );
}

export default EditQuestion;
