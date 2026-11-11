import classNames from "classnames";
import { ReactNode } from "react";

type SectionInfoProps = {
    subheading: string;
    heading: string;
    description?: ReactNode;
    align?: "center" | "left";
    // light text for dark burgundy bands
    onDark?: boolean;
};

function SectionInfo({ subheading, heading, description, align = "center", onDark = false }: SectionInfoProps) {
    return (
        <div className={classNames("section-info", `section-info--${align}`, { "section-info--light": onDark })}>
            <span className="heading-sub">{subheading}</span>
            <h2 className="heading-secondary">{heading}</h2>
            {description && <p className="lede">{description}</p>}
        </div>
    );
}

export default SectionInfo;
