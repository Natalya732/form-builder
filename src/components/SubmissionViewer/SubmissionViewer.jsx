import Preview from "components/Preview/Preview";
import React from "react";

export default function SubmissionViewer({ submission, formId, onClose }) {
  return <Preview formId={formId} submission={submission} onClose={onClose} />;
}
