import React from "react";
import styles from "./index.module.css";
import BackButton from "../../components/Buttons/BackButton";

const NotFound = () => {
  return (
    <div className={styles["not-found-container"]}>
      <p className={styles["not-found-text"]}>404 Error: Page not found</p>
      <BackButton />
    </div>
  );
};

export default NotFound;
