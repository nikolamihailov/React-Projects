import { ReactNode } from "react";

type NavProps = {
    navClassname: string;
    children: ReactNode;
};

function Nav({ navClassname, children }: NavProps) {
    return <nav className={`nav nav__${navClassname}`}>{children}</nav>;
}

export default Nav;
