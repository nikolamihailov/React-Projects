import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
    el: "button";
    type?: "small" | "medium" | "large";
    variant: "primary" | "secondary";
    onClickFunc?: () => void;
    children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

type LinksProps = {
    el: "link";
    type?: "small" | "medium";
    variant: "primary" | "secondary";
    href: string;
    children: ReactNode;
} & ComponentPropsWithoutRef<"a">;

function Button(props: ButtonProps | LinksProps) {
    const { el, type, variant, children, ...otherProps } = props;

    const className = `btn-link btn-link--${type} btn-link--${variant}`;

    if (el === "link" && props.href.includes("#")) {
        return (
            <a className={className} {...(otherProps as LinksProps)}>
                {children}
            </a>
        );
    }

    if (el === "link") {
        return (
            <Link className={className} to={props.href} {...(otherProps as LinksProps)}>
                {children}
            </Link>
        );
    }

    return (
        <button className={className} {...(otherProps as ButtonProps)} onClick={props.onClickFunc}>
            {children}
        </button>
    );
}

export default Button;
