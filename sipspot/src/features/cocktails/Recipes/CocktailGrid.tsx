import classNames from "classnames";
import { CocktailSummary } from "../../../types/cocktails/Cocktail";
import StatusMessage from "../../shared/components/UI/StatusMessage/StatusMessage";
import CocktailCard from "./CocktailCard";

type CocktailGridProps = {
    cocktails: CocktailSummary[] | undefined;
    isLoading: boolean;
    isError: boolean;
    isRefreshing: boolean;
    emptyMessage: string;
    onRetry: () => void;
};

function CocktailGrid({ cocktails, isLoading, isError, isRefreshing, emptyMessage, onRetry }: CocktailGridProps) {
    if (isError) {
        return (
            <StatusMessage
                variant="error"
                message="We couldn't reach the cocktail menu. Check your connection and try again."
                onRetry={onRetry}
            />
        );
    }

    if (isLoading || !cocktails) return <StatusMessage variant="loading" message="Mixing your drinks..." />;

    if (!cocktails.length) return <StatusMessage variant="empty" message={emptyMessage} />;

    return (
        <ul className={classNames("cocktail-grid", { "cocktail-grid--refreshing": isRefreshing })}>
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
            ))}
        </ul>
    );
}

export default CocktailGrid;
