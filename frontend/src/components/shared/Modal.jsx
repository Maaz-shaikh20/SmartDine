import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Icons } from "../icons/IconSystem";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "450px",
  showCloseButton = true,
}) => {
  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box fade-up"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h3 className="modal-title">{title}</h3>}
            {showCloseButton && (
              <button className="modal-close-btn" onClick={onClose}>
                <Icons.close size={20} />
              </button>
            )}
          </div>
        )}
        <div className="modal-body-content">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
