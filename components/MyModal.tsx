import React from "react";
import styles from "../styles/components/MyModal.module.scss";
import cn from "classnames";

const MyModal = ({ children, isVisible, setVisible }) => {
  function closeModal() {
    setVisible(false);
  }

  return (
    <div
      className={cn(styles["modal"], {
        [styles["modal_active"]]: isVisible,
      })}
      onClick={closeModal}
    >
      <div
        className={styles["modal__content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button className={styles["modal__close-btn"]} onClick={closeModal}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default MyModal;
