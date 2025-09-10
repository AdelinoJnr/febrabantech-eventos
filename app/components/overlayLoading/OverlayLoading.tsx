import React from "react";
import styles from "./overlayLoading.module.scss";

export default function OverlayLoading() {
  return (
    <div className={styles.overlay} data-testid="overlay-loading">
      <div className={styles.spinner}></div>
    </div>
  )
}
