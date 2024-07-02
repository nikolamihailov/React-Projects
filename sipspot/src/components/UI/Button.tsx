import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}

export default Button;
