import React, { useEffect , useState} from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "react-feather";
import query from "utils/query";
import Button from "components/Button/Button";
import FormBox from "components/FormBox/FormBox";

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const listener = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); 
    };
  
    listener();
  
    window.addEventListener("storage", listener); 
  
    return () => window.removeEventListener("storage", listener); 
  }, []);
  

  console.log("tokan", isAuthenticated);
 
  return (
    <div className={styles.page}>
      <div className={styles.upperPage}>
        <div className={styles.title}>
          <h2>EASYFORMS</h2>
          <p className={styles.typed}>
            Create forms that engage and change ...{" "}
          </p>
          <Button
            onClick={() => {
              if (isAuthenticated) navigate("/user");
              else navigate("/login");
            }}
          >
            {isAuthenticated ? "Manage Your Forms" : "Get Started"} <ArrowRight />
          </Button>
        </div>
      </div>
      <div className={styles.lowerPage}>
        <div className={styles.header}>
          <h2 className={styles.heading}>All Projects</h2>
        </div>
        <div className={styles.formContainer}>
          <FormBox />
        </div>
      </div>
    </div>
  );
}
