import styles from "./Button.module.css";

const Button = ({
  variant,
  size,
  disabled = false,
  onClick,
  className = "",
  leftIcon = null,
  rightIcon = null,
  children,
}) => {
  const moduleCss = className.includes("style");
  const newClassName = moduleCss ? styles[`${className}`] : className;

  return (
    <button
      className={`${styles[variant]} ${styles[size]} ${styles["button"]} ${newClassName}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;
