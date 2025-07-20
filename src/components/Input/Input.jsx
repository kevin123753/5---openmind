import { useState } from "react";
import styles from "./Input.module.css";

const Input = ({
  placeholder = "",
  icon = null,
  variant = "primary",
  size = "medium",
  type = "input", // "input" | "textarea"
  disabled = false,
  value = "",
  onChange,
  className = "",
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  const isTextarea = type === "textarea";
  const isFilled = value?.trim() !== "";

  const wrapperClass = `
    ${styles.wrapper}
    ${styles[variant]}
    ${styles[size]}
    ${focused ? styles.focused : ""}
    ${isFilled ? styles.filled : ""}
    ${disabled ? styles.disabled : ""}
    ${isTextarea ? styles.textareaWrapper : ""}
  `.trim();

  return (
    <div className={wrapperClass}>
      {/* 아이콘은 input일 때만 */}
      {!isTextarea && icon && <span className={styles.icon}>{icon}</span>}
      {isTextarea ? (
        <textarea
          className={`${styles.input} ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
      ) : (
        <input
          className={`${styles.input} ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
      )}
    </div>
  );
};

export default Input;
