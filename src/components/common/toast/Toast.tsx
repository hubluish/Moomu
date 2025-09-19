import React, { ReactNode } from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  show: boolean;
  icon?: ReactNode;
}

const Toast: React.FC<ToastProps> = ({ message, show, icon }) => {
  return (
    <div className={`${styles.toastContainer} ${show ? styles.show : ""}`}>
      {icon && <div className={styles.toastIconWrapper}>{icon}</div>}
      <span className={styles.toastText}>{message}</span>
    </div>
  );
};

export default Toast;
