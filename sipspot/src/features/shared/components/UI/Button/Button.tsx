import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
    el: "button";
    type?: "small" | "medium" | "large";
    variant: "primary" | "secondary";
    onClickFunc?: () => void;
    children: ReactNode;
    // `type` is the size prop here, so the native button `type` is left out (always "button")
} & Omit<ComponentPropsWithoutRef<"button">, "type">;

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

    // onClickFunc is pulled out so it isn't passed to the DOM as an unknown attribute
    const { onClickFunc, ...buttonProps } = otherProps as Omit<ButtonProps, "el" | "type" | "variant" | "children">;

    return (
        <button type="button" className={className} {...buttonProps} onClick={onClickFunc}>
            {children}
        </button>
    );
}

export default Button;
