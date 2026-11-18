import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./AdminModal.module.css";
import Spinner from "../../Spinner/Spinner";

// Rendered into the themed .app element (not <body>) so the modal picks up
// the current light/dark colour variables.
const portalTarget = () => document.querySelector(".app") || document.body;

// Shared dialog for admin forms and confirmations: centred, never taller than
// the screen (the body scrolls instead), closes on Escape or backdrop click.
const AdminModal = ({
  title,
  onClose,
  children,
  footer,
  size = "md",
  isLoading = false,
  as: Tag = "div",
  onSubmit,
}) => {
  const titleId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div className={styles["overlay"]} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <Tag
        ref={dialogRef}
        className={`${styles["dialog"]} ${styles[size]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onSubmit={onSubmit}
        noValidate={Tag === "form" ? true : undefined}
      >
        <div className={styles["header"]}>
          <h2 id={titleId}>{title}</h2>
          <button type="button" className={styles["close"]} onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className={styles["body"]}>
          {isLoading ? (
            <div className={styles["loading"]}>
              <Spinner inline />
            </div>
          ) : (
            children
          )}
        </div>
        {footer && !isLoading && <div className={styles["footer"]}>{footer}</div>}
      </Tag>
    </div>,
    portalTarget()
  );
};

export const ModalButton = ({ variant = "secondary", children, ...props }) => (
  <button type="button" className={`${styles["button"]} ${styles[variant]}`} {...props}>
    {children}
  </button>
);

// Confirmation for destructive actions.
export const ConfirmDialog = ({
  title,
  children,
  confirmLabel = "Delete",
  onConfirm,
  onClose,
  isLoading,
  isBusy,
}) => (
  <AdminModal
    title={title}
    onClose={onClose}
    size="sm"
    isLoading={isLoading}
    footer={
      <>
        <ModalButton onClick={onClose} disabled={isBusy}>
          Cancel
        </ModalButton>
        <ModalButton variant="danger" onClick={onConfirm} disabled={isBusy}>
          {isBusy ? "Deleting..." : confirmLabel}
        </ModalButton>
      </>
    }
  >
    <div className={styles["confirm"]}>
      <span className={styles["confirm-icon"]} aria-hidden="true">
        <i className="fa-solid fa-trash-can"></i>
      </span>
      <div>{children}</div>
    </div>
  </AdminModal>
);

export default AdminModal;
