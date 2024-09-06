import React from "react";
import styles from "./Question.module.css";
import InputControl from "../InputControl/InputControl";
import Dropdown from "../Dropdown/Dropdown";
import Switch from "components/Switch/Switch";

export default function Question({ formState, handleChange, handleDelete }) {
  const options = [
    { name: "Input Field", value: "input" },
    { name: "Textarea", value: "textarea" },
    { name: "Radio Buttons", value: "radio" },
    { name: "Checkboxes", value: "checkbox" },
  ];

  const checkboxOptions = [
    { name: "Yes", value: "yes" },
    { name: "No", value: "no" },
  ];

  const inputOptions = [
    { name: "Text", value: "text" },
    { name: "Email", value: "email" },
    { name: "Date", value: "date" },
    { name: "Number", value: "number" },
    { name: "File", value: "file" },
    { name: "URL", value: "url" },
  ];

  return (
    <>
      {formState?.questionInfo?.map((item, index) => (
        <div className={styles.innerForm}>
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
              labelClass={styles.label}
              value={item.title}
              onChange={(e) => handleChange(e, index, "title")}
            />
          </div>
          <div style={{ display: "flex", width: "100%", gap: "20px" }}>
            <div className={styles.customInputGroup} style={{ flex: "1" }}>
              <Dropdown
                label="Question Type"
                options={options}
                labelClass={styles.label}
                selectedOption={
                  options.find((option) => option.value === item.type) || {
                    name: "Select a Type",
                    value: "",
                  }
                }
                handleSelected={(option) => handleChange(option, index, "type")}
              />
            </div>
            {item.type === "input" && (
              <div className={styles.customInputGroup} style={{ flex: "1" }}>
                <Dropdown
                  label="Select type of Input Box"
                  options={inputOptions}
                  selectedOption={
                    inputOptions.find(
                      (option) => option.value === item.inputType
                    ) || {
                      name: "Select a Type",
                      value: "",
                    }
                  }
                  handleSelected={(option) =>
                    handleChange(option, index, "inputType")
                  }
                />
              </div>
            )}
            {item.type === "checkbox" && (
              <div className={styles.customInputGroup} style={{ flex: "1" }}>
                <Dropdown
                  label="Can multiple checkboxes be selected ?"
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
              <div className={styles.customInputGroup} style={{ flex: "1" }}>
                <InputControl
                  label="Enter the number of options you require"
                  autoFocus
                  type="number"
                  inputClass={styles.input}
                  value={item.optionsNumber}
                  onChange={(e) => handleChange(e, index, "optionsNumber")}
                />
              </div>
            )}
          </div>
          {Array.from({ length: item.optionsNumber || 0 })
            .fill()
            .map((_, idex) => (
              <div className={styles.optionRadio} key={idex}>
                <p>Option {idex + 1} Text</p>
                <InputControl
                  inputClass={styles.input}
                  value={item.options[idex] || ""}
                  onChange={(e) => handleChange(e, index, "optionArr", idex)}
                />

              </div>
            ))}

         <div className={styles.required}>
          <Switch label="Required Field"/>
         </div>

        </div>
      ))}
    </>
  );
}
