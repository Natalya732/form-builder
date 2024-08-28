import React, { useState } from "react";
import styles from "./createForm.module.css";
import InputControl from "../../components/InputControl/InputControl";
import TextareaControl from "../../components/TextareaControl/TextareaControl";
import Dropdown from "../../components/Dropdown/Dropdown";

export default function CreateForm() {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    questionInfo: [
      {
        id: Date.now(),
        title: "",
        type: "",
        num: "",
        multiple: "",
        options: [],
      },
    ],
  });

  const options = [
    { name: "Input Field", value: "input" },
    { name: "Textarea", value: "textarea" },
    { name: "Radio Buttons", value: "radio" },
    { name: "Checkboxes", value: "checkbox" },
  ];

  const checkboxOptions = [
    { name: "Multiple", value: "multiple" },
    { name: "Single", value: "single" },
  ];

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

  const handleChange = (e, index, name) => {
    let updatedArray = [...formState.questionInfo];
    console.log("updatedARR0", updatedArray);
    if (name === "type" || name === "multiple") {
      updatedArray[index][name] = e.value;
    } else if (name === "options") {
      updatedArray[index]?.options.push(e);
    } else {
      updatedArray[index][name] = e.target.value;
    }
    setFormState((prev) => ({ ...prev, questionInfo: updatedArray }));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>CREATE FORM</h1>
      <div className={styles.innerForm}>
        <h2 style={{ color: "white" }}>Basic Form Info</h2>
        <div className={styles.customInputGroup}>
          <InputControl
            label="Form Name"
            autoFocus
            inputClass={styles.input}
            value={formState.name}
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
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
      </div>
      {formState?.questionInfo?.map((item, index) => (
        <div className={styles.innerForm} key={item.id}>
          <div className={styles.questionHeader}>
            <h2>Questions</h2>
            <p
              className={styles.deleteLink}
              onClick={() => handleDelete(item, index)}
            >
              - Delete Question
            </p>
          </div>
          <div className={styles.customInputGroup}>
            <InputControl
              label="Question Title"
              autoFocus
              inputClass={styles.input}
              value={item.title}
              onChange={(e) => handleChange(e, index, "title")}
            />
          </div>
          <div className={styles.customInputGroup}>
            <Dropdown
              label="Question Type"
              options={options}
              selectedOption={
                options.find((option) => option.value === item.type) || {
                  name: "Select a Type",
                  value: "",
                }
              }
              handleSelected={(option) => handleChange(option, index, "type")}
            />
          </div>
          {item.type === "checkbox" && (
            <div className={styles.customInputGroup}>
              <Dropdown
                label="Can multiple checkboxes be selected?"
                options={checkboxOptions}
                selectedOption={
                  checkboxOptions.find(
                    (option) => option.value === item.multiple
                  ) || {
                    name: "Select an Option",
                    value: "",
                  }
                }
                handleSelected={(option) =>
                  handleChange(option, index, "multiple")
                }
              />
            </div>
          )}
          {(item.type === "radio" || item.type === "checkbox") && (
            <div className={styles.customInputGroup}>
              <InputControl
                label="Enter the number of options you require"
                autoFocus
                type="number"
                inputClass={styles.input}
                value={item.num}
                onChange={(e) => handleChange(e, index, "num")}
              />
            </div>
          )}
          {Array.from({ length: item.num || 0 })
            .fill()
            .map((_, idex) => (
              <div className={styles.optionRadio} key={idex}>
                <p>Option {idex + 1} Text</p>
                <InputControl
                  inputClass={styles.input}
                  value={item.options[idex] || ""} // Display existing value or empty string
                  onChange={(e) => {
                    let updatedArray = [...formState.questionInfo];

                    // Initialize optionsArr if it doesn't exist
                    if (!updatedArray[index].options) {
                      updatedArray[index].options = [];
                    }

                    // Update the options array
                    updatedArray[index].options[idex] = e.target.value;

                    setFormState((prev) => ({
                      ...prev,
                      questionInfo: updatedArray,
                    }));
                  }}
                />
              </div>
            ))}
        </div>
      ))}
      <div className={styles.innerForm}>
        <p className={styles.addLink} onClick={handleAddition}>
          Add new Question +{" "}
        </p>
      </div>
      <button className={styles.button}>Submit Form</button>
    </div>
  );
}
