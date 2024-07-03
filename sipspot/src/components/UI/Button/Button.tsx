import { ReactNode } from "react";
import stylesBtn from "./Button.module.css";

type ButtonProps = {
  type?: "small" | "medium" | "large";
  bgColor: string;
  color: string;
  children: ReactNode;
};

function Button({ type = "small", bgColor, color, children }: ButtonProps) {
  const styles = {
    backgroundColor: bgColor,
    color: color,
  };

  if (type === "small") {
    return (
      <button style={styles} className={`${stylesBtn["btn"]} ${stylesBtn["small"]}`}>
        {children}
      </button>
    );
  }
  if (type === "medium") {
    return <button style={styles}>{children}</button>;
  }
  return <button style={styles}>{children}</button>;
}

export default Button;
