import React from "react";
import styles from "./overlayLoading.module.scss";

export default function OverlayLoading() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  )
}
