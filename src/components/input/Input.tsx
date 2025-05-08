import React from "react";
import "./style.scss"; // Optional styling

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const Input: React.FC<InputProps> = ({
  showToggle,
  showPassword,
  onTogglePassword,
  type,
  ...props
}) => {
  const actualType = showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="input-wrapper">
      <input className="input" type={actualType} {...props} />
      {showToggle && (
        <span className="toggle-icon" onClick={onTogglePassword} color="blue">
          {showPassword ? "Hide" : "Show"}
        </span>
      )}
    </div>
  );
};

export default Input;
