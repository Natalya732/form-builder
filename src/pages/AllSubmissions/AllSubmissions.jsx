import React, { useEffect, useState } from "react";
import styles from "./AllSubmissions.module.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import query from "utils/query";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import SubmissionViewer from "components/SubmissionViewer/SubmissionViewer";

export default function AllSubmissions() {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [submissionArray, setSubmissionArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const getFormSubmissions = async (id) => {
    setLoading(true);
    const res = await query("/submissions/form/" + id);
    setLoading(false);
    if (!res) {
      toast.error("Something went wrong in fetching forms");
    }
    setSubmissionArray(res);
  };

  useEffect(() => {
    getFormSubmissions(formId);
  }, [formId]);

  return (
    <div className={`${styles.submissionPage}`}>
      {loading ? (
        <div className="w-screen h-screen flex justify-content-center align-items-center">
          <Loader />;
        </div>
      ) : selectedSubmission ? (
        <SubmissionViewer
          submission={selectedSubmission}
          formId={formId}
          onClose={() => setSelectedSubmission(null)}
        />
      ) : (
        <>
          <div className="flex justify-content-between align-items-center p-3">
            <div className="text-4xl font-bold">All Submissions</div>
            <Button onClick={() => navigate("/user/")}>Go Back</Button>
          </div>

          <div className={styles.submissionSection}>
            {submissionArray.map((item, index) => (
              <>
                <div className={styles.submissionRow}>
                  Submission {index + 1}
                  <Button onClick={() => setSelectedSubmission(item)}>
                    View Submission
                  </Button>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
