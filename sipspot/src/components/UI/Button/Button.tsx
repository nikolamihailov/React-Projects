import { ComponentPropsWithoutRef, ReactNode } from "react";
import stylesBtn from "./Button.module.css";

type ButtonProps = {
  el: "button";
  type?: "small" | "medium" | "large";
  bgColor: string;
  color: string;
  hoverBgColor?: string;
  hoverColor?: string;
  onClickFunc?: () => void;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

type LinksProps = {
  el: "link";
  type?: "small" | "medium";
  bgColor: string;
  color: string;
  hoverBgColor?: string;
  hoverColor?: string;
  onClickFunc?: () => void;
  children: ReactNode;
} & ComponentPropsWithoutRef<"a">;

function Button(props: ButtonProps | LinksProps) {
  const { el, type, bgColor, color, children, hoverBgColor, hoverColor, ...otherProps } = props;

  const styles = {
    backgroundColor: bgColor,
    color: color,
  };

  const className = `${stylesBtn["btn-link"]} ${stylesBtn[type ? type : "small"]}`;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (hoverBgColor) target.style.backgroundColor = hoverBgColor;
    if (hoverColor) target.style.color = hoverColor;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = bgColor;
    target.style.color = color;
  };

  if (el === "link") {
    return (
      <a
        style={styles}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={props.onClickFunc}
        {...(otherProps as LinksProps)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      style={styles}
      className={className}
      {...(otherProps as ButtonProps)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={props.onClickFunc}
    >
      {children}
    </button>
  );
}

export default Button;
