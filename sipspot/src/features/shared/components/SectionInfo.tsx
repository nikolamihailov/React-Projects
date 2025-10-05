type SectionInfoProps = {
    subheading: string;
    heading: string;
};

function SectionInfo({ subheading, heading }: SectionInfoProps) {
    return (
        <div>
            <span className="heading-sub">{subheading}</span>
            <h2 className="heading-secondary">{heading}</h2>
        </div>
    );
}

export default SectionInfo;
