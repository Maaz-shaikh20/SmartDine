import React from "react";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      className={`btn-modern btn-${variant} btn-${size} ${className} ${loading ? "loading" : ""}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {icon && !loading && <span className="btn-icon-slot">{icon}</span>}
      {children && <span className="btn-content">{children}</span>}
    </button>
  );
};

export default Button;
