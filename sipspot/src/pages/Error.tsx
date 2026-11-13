import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Button from "@/features/shared/components/UI/Button/Button";

// Rendered both for unknown URLs (no route error -> 404) and as the errorElement when a page throws
function ErrorPage() {
    const error = useRouteError();
    const isNotFound = !error || (isRouteErrorResponse(error) && error.status === 404);

    if (error && !isNotFound) console.error(error);

    const handleReload = () => window.location.reload();

    return (
        <section className="error-page container">
            <img src="/not-found.webp" alt="" className="error-page__image" width={240} height={240} />
            <span className="heading-sub">{isNotFound ? "Error 404" : "Something went wrong"}</span>
            <h1 className="heading-secondary">{isNotFound ? "This glass is empty" : "We spilled this one"}</h1>
            <p className="lede">
                {isNotFound
                    ? "The page you're looking for has been moved, finished or never existed."
                    : "This page hit an unexpected error. Reloading usually fixes it - especially right after we've updated the site."}
            </p>
            <div className="error-page__actions">
                {isNotFound ? (
                    <Button el="link" type="medium" variant="primary" href="/">
                        Back to home
                    </Button>
                ) : (
                    <Button el="button" type="medium" variant="primary" onClickFunc={handleReload}>
                        Reload the page
                    </Button>
                )}
                <Button el="link" type="medium" variant="outline" href="/recipes">
                    Browse the menu
                </Button>
            </div>
        </section>
    );
}

export default ErrorPage;
