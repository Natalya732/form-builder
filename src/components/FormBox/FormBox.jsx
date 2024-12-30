import React, { useState } from "react";
import styles from "./FormBox.module.css";
import { Eye, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
export default function FormBox({
  data,
  index,
  handleDialog,
}) {
  const navigate = useNavigate();
  const [urlToCopy, setUrlToCopy] = useState(false);

  function copy() {
    const baseUrl = window.location.origin;

    const formUrl = `${baseUrl}/forms/${data?._id}`;

    navigator.clipboard
      .writeText(formUrl)
      .then(() => {
        setUrlToCopy(true);
        setTimeout(() => setUrlToCopy(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy");
        const el = document.createElement("input");
        el.value = formUrl;
        document.body.appendChild(el);

        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setUrlToCopy(true);
      });
  }

  return (
    <div className={styles.box} key={index}>
      <div className={styles.content}>
        <div className={styles.formboxHeader}>
          <h2>{data?.name}</h2>
          <span className="flex gap-3">
            <Eye onClick={() => navigate("/forms/" + data?._id)} />
            <Trash2 onClick={() => handleDialog(data?._id)} />
          </span>
        </div>
        <p className={styles.description}>{data?.description}</p>
        <div className={styles.inlineText}>
          <p>Questions : </p>
          <p className="bold-text">5</p>
        </div>

        <div className={styles.inlineText}>
          <p>Submissions : </p>
          <p className="bold-text">{data?.submissionCount}</p>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            className={`${styles.submitButton} cursor-pointer`}
            onClick={() => navigate("/create-form/" + data?._id)}
          >
            Edit
          </button>
          <button
            className={`${styles.submitButton} cursor-pointer`}
            onClick={() => navigate("/submissions/" + data?._id)}
          >
            Submission
          </button>
          <button
            className={`${styles.submitButton} cursor-pointer`}
            onClick={copy}
          >
            {!urlToCopy ? "Copy Link" : "Copied !"}
          </button>
        </div>
      </div>
    </div>
  );
}
