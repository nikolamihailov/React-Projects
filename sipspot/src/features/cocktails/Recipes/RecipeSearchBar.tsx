import { ChangeEvent, FormEvent } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

type RecipeSearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
};

function RecipeSearchBar({ value, onChange, onClear }: RecipeSearchBarProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

    // results update while typing, so submitting only needs to stop the page reload
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

    return (
        <form className="recipe-search" role="search" onSubmit={handleSubmit}>
            <label htmlFor="recipe-search-input" className="sr-only">
                Search cocktails by name
            </label>
            <IoSearch className="recipe-search__icon" aria-hidden="true" />
            <input
                id="recipe-search-input"
                className="recipe-search__input"
                type="search"
                placeholder="Search cocktails, e.g. Mojito"
                autoComplete="off"
                value={value}
                onChange={handleChange}
            />
            {value && (
                <button type="button" className="recipe-search__clear" aria-label="Clear search" onClick={onClear}>
                    <IoClose aria-hidden="true" />
                </button>
            )}
        </form>
    );
}

export default RecipeSearchBar;
