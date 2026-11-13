import Button from "@/features/shared/components/UI/Button/Button";

type StatusMessageProps = {
    variant: "loading" | "error" | "empty";
    message: string;
    onRetry?: () => void;
};

function StatusMessage({ variant, message, onRetry }: StatusMessageProps) {
    const isError = variant === "error";

    return (
        <div className={`status-message status-message--${variant}`} role={isError ? "alert" : "status"}>
            {variant === "loading" && <span className="status-message__spinner" aria-hidden="true" />}
            <p className="status-message__text">{message}</p>
            {isError && onRetry && (
                <Button el="button" type="small" variant="primary" onClickFunc={onRetry}>
                    Try again
                </Button>
            )}
        </div>
    );
}

export default StatusMessage;
