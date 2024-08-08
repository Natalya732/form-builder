import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        {" "}
        <h2 className={styles.heading}>Hey Aashu</h2>
        <button className={styles.activeButton} onClick={()=> navigate("/create-form")}>Create form</button>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.box}>
          <div className={styles.content}>
            <h4>This is form heading</h4>
            <p className={styles.description}>
              This is some description of above heading which is aashu's form. and has been written with love
            </p>
            <div className={styles.inlineText}>
              <p>Questions : </p>
              <p className="bold-text">5</p>
            </div>

            <div className={styles.inlineText}>
              <p>Submissions : </p>
              <p className="bold-text">15</p>
            </div>
            
            <div className={styles.buttonContainer}>
              <button className={styles.inactiveButton}>Edit</button>
              <button className={styles.activeButton}>Submission</button>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.content}>
            <h4>This is form heading</h4>
            <p className={styles.description}>
              This is some description of above heading which is aashu's form. and has been written with love
            </p>
            <div className={styles.inlineText}>
              <p>Questions : </p>
              <p className="bold-text">5</p>
            </div>

            <div className={styles.inlineText}>
              <p>Submissions : </p>
              <p className="bold-text">15</p>
            </div>
            
            <div className={styles.buttonContainer}>
              <button className={styles.inactiveButton}>Edit</button>
              <button className={styles.activeButton}>Submission</button>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.content}>
            <h4>This is form heading</h4>
            <p className={styles.description}>
              This is some description of above heading which is aashu's form. and has been written with love
            </p>
            <div className={styles.inlineText}>
              <p>Questions : </p>
              <p className="bold-text">5</p>
            </div>

            <div className={styles.inlineText}>
              <p>Submissions : </p>
              <p className="bold-text">15</p>
            </div>
            
            <div className={styles.buttonContainer}>
              <button className={styles.inactiveButton}>Edit</button>
              <button className={styles.activeButton}>Submission</button>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.content}>
            <h4>This is form heading</h4>
            <p className={styles.description}>
              This is some description of above heading which is aashu's form. and has been written with love
            </p>
            <div className={styles.inlineText}>
              <p>Questions : </p>
              <p className="bold-text">5</p>
            </div>

            <div className={styles.inlineText}>
              <p>Submissions : </p>
              <p className="bold-text">15</p>
            </div>
            
            <div className={styles.buttonContainer}>
              <button className={styles.inactiveButton}>Edit</button>
              <button className={styles.activeButton}>Submission</button>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.content}>
            <h4>This is form heading</h4>
            <p className={styles.description}>
              This is some description of above heading which is aashu's form. and has been written with love
            </p>
            <div className={styles.inlineText}>
              <p>Questions : </p>
              <p className="bold-text">5</p>
            </div>

            <div className={styles.inlineText}>
              <p>Submissions : </p>
              <p className="bold-text">15</p>
            </div>
            
            <div className={styles.buttonContainer}>
              <button className={styles.inactiveButton}>Edit</button>
              <button className={styles.activeButton}>Submission</button>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.content}>
            <h4>This is form heading</h4>
            <p className={styles.description}>
              This is some description of above heading which is aashu's form. and has been written with love
            </p>
            <div className={styles.inlineText}>
              <p>Questions : </p>
              <p className="bold-text">5</p>
            </div>

            <div className={styles.inlineText}>
              <p>Submissions : </p>
              <p className="bold-text">15</p>
            </div>
            
            <div className={styles.buttonContainer}>
              <button className={styles.inactiveButton}>Edit</button>
              <button className={styles.activeButton}>Submission</button>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.content}>
            <h4>This is form heading</h4>
            <p className={styles.description}>
              This is some description of above heading which is aashu's form. and has been written with love
            </p>
            <div className={styles.inlineText}>
              <p>Questions : </p>
              <p className="bold-text">5</p>
            </div>

            <div className={styles.inlineText}>
              <p>Submissions : </p>
              <p className="bold-text">15</p>
            </div>
            
            <div className={styles.buttonContainer}>
              <button className={styles.inactiveButton}>Edit</button>
              <button className={styles.activeButton}>Submission</button>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.content}>
            <h4>This is form heading</h4>
            <p className={styles.description}>
              This is some description of above heading which is aashu's form. and has been written with love
            </p>
            <div className={styles.inlineText}>
              <p>Questions : </p>
              <p className="bold-text">5</p>
            </div>

            <div className={styles.inlineText}>
              <p>Submissions : </p>
              <p className="bold-text">15</p>
            </div>
            
            <div className={styles.buttonContainer}>
              <button className={styles.inactiveButton}>Edit</button>
              <button className={styles.activeButton}>Submission</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
