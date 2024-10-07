import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import stylesBtn from "./Button.module.css";

type ButtonProps = {
  el: "button";
  variant?: "primary" | "secondary";
  type?: "small" | "medium" | "large";
  onClickFunc?: () => void;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

type LinkProps = {
  el: "link";
  variant?: "primary" | "secondary";
  type?: "small" | "medium";
  href: string;
  children: ReactNode;
  style?: CSSProperties;
} & ComponentPropsWithoutRef<"a">;

function Button(props: ButtonProps | LinkProps) {
  const { el, variant = "primary", type = "small", children, style, ...otherProps } = props;

  const theme = useTheme();

  const variantStyles = {
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      hoverBgColor: theme.palette.secondary.main,
      hoverColor: "#000",
    },
    secondary: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.main,
      hoverBgColor: theme.palette.secondary.main,
      hoverColor: "#000",
    },
  };

  const { backgroundColor, color, hoverBgColor, hoverColor } = variantStyles[variant];

  const styles = {
    backgroundColor,
    color,
    border: `1px solid ${backgroundColor}`,
    ...style,
  };

  const className = `${stylesBtn["btn-link"]} ${stylesBtn[type]}`;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (hoverBgColor) target.style.backgroundColor = hoverBgColor;
    if (hoverColor) target.style.color = hoverColor;
    if (backgroundColor) target.style.border = `1px solid ${backgroundColor}`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = backgroundColor;
    target.style.color = color;
    target.style.border = `1px solid ${backgroundColor}`;
  };

  if (el === "link") {
    return props.href?.includes("#") ? (
      <a
        style={styles}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...(otherProps as LinkProps)}
        href={props.href}
      >
        {children}
      </a>
    ) : (
      <Link
        style={styles}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        to={props.href}
        {...(otherProps as LinkProps)}
      >
        {children}
      </Link>
    );
  }

  // Handle button elements
  return (
    <button
      style={styles}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={props.onClickFunc} // Manually handle onClickFunc
      {...(otherProps as ButtonProps)}
    >
      {children}
    </button>
  );
}

export default Button;
