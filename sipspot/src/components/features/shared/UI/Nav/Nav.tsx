import { ReactNode } from "react";
import { Colors } from "../../../../../types/Colors";

type NavProps = {
  bgColor?: string;
  children: ReactNode;
};

function Nav({ bgColor = Colors.Black, children }: NavProps) {
  return (
    <nav style={{ backgroundColor: bgColor }} className="nav">
      {children}
    </nav>
  );
}

export default Nav;

