import Button from "@/features/shared/components/UI/Button/Button";

function ErrorPage() {
    return (
        <section className="error-page container">
            <img src="/not-found.webp" alt="" className="error-page__image" width={240} height={240} />
            <span className="heading-sub">Error 404</span>
            <h1 className="heading-secondary">This glass is empty</h1>
            <p className="lede">The page you're looking for has been moved, finished or never existed.</p>
            <div className="error-page__actions">
                <Button el="link" type="medium" variant="primary" href="/">
                    Back to home
                </Button>
                <Button el="link" type="medium" variant="outline" href="/recipes">
                    Browse the menu
                </Button>
            </div>
        </section>
    );
}

export default ErrorPage;
