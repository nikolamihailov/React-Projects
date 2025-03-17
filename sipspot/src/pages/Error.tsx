import Button from "../features/shared/components/UI/Button/Button";
import Section from "../features/shared/components/UI/Section/Section";

function ErrorPage() {
    return (
        <Section sectionClassName="error">
            <div className="error-page">
                <img src="/not-found.png" alt="Not found page image" className="error-page__image" />
                <h1 className="error-page__heading">Oops! Page not found</h1>
                <Button type="small" el="link" variant="primary" href="/">
                    Go back home
                </Button>
            </div>
        </Section>
    );
}

export default ErrorPage;
