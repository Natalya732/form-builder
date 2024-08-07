import React from "react";
import styles from "./Navbar.module.css";
import img from "../../components/images/hummingbird-1935665_640.webp";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.nav}>
        <div className={styles.logoBox}>
          <img src={img} />
          <p className="bold-text lg"> Form Creator</p>
        </div>
        <div className={styles.icons}>
          <i class="fa-solid fa-palette" title=" Customize Theme"></i>
          <i class="fa-solid fa-rotate-left" title="Undo"></i>
          <i class="fa-solid fa-file-import" title="Send"></i>
          <i class="fa-solid fa-angles-right" title="More"></i>
        </div>
      </div>
    </div>
  );
}
