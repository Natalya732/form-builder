import React, { useState, useEffect } from "react";
import styles from "./User.module.css";
import { Camera, LogOut } from "react-feather";
import InputControl from "components/InputControl/InputControl";
import Button from "components/Button/Button";
import FormBox from "components/FormBox/FormBox";
import { useNavigate } from "react-router-dom";
import query from "utils/query";
import Dialog from "components/Dialog/Dialog";
import Loader from "components/Loader/Loader";
import { capitilizeString } from "utils/util";

export default function User() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userForms, setUserForms] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // ***************************************** Functions **********************************************
  const handleDialog = (id) => {
    setSelectedFormId(id);
    setShowDialog((prev) => !prev);
  };
  // ****************************** integration part ************************************
  const logoutFunction = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getUserDetails = async () => {
    const res = await query("/users/me", undefined, "GET");
    if (!res) return;
    else {
      setUserState((p) => ({
        ...p,
        name: res.name,
        email: res.email,
        phone: res.phone,
      }));
    }
  };

  const deleteForm = async (id) => {
    const res = await query("/forms/" + id, undefined, "DELETE");
    console.log("delete form response", res);
  };

  const getFormOfUser = async () => {
    setLoading(true);
    const forms = await query("/forms", undefined, "GET");

    if (forms) {
      setUserForms(forms);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFormOfUser();
    getUserDetails();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span>
          Welcome{" "}
          <p className={styles.title}>{capitilizeString(userState?.name)}</p>
        </span>
        <p onClick={() => logoutFunction()}>
          <LogOut /> Logout
        </p>
      </div>
      <div className={styles.userInfo}>
        <h2>Your Profile</h2>
        <div className={styles.userDetails}>
          <div className={styles.userInfoLeft}>
            <span>
              <label htmlFor="file-upload">
                <Camera />
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={(e) => console.log("e is", e)}
              />
            </span>
          </div>
          <div className={styles.userInfoRight}>
            <InputControl
              label="Name"
              autoFocus
              inputClass={styles.input}
              value={userState.name}
              onChange={(e) =>
                setUserState((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <InputControl
              label="Email"
              autoFocus
              inputClass={styles.input}
              value={userState.email}
              onChange={(e) =>
                setUserState((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <InputControl
              label="Phone"
              autoFocus
              inputClass={styles.input}
              value={userState.phone}
              onChange={(e) =>
                setUserState((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
            <InputControl
              label="Address"
              autoFocus
              inputClass={styles.input}
              value={userState.address}
              onChange={(e) =>
                setUserState((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
            <Button>Save</Button>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.userForms}>
        <div className={styles.formHeader}>
          <h2>Your forms</h2>
          <Button onClick={() => navigate("/create-form")}>Add Form</Button>
        </div>
        <div className={styles.formBody}>
          {loading ? (
            <Loader />
          ) : (
            <div className={styles.formContainer}>
              {userForms.map((item, index) => (
                <FormBox
                  data={item}
                  handleDialog={handleDialog}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {showDialog && (
        <Dialog
          closeDialog={handleDialog}
          formId={selectedFormId}
          onDelete={deleteForm}
        />
      )}
    </div>
  );
}
