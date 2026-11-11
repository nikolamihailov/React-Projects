import { ChangeEvent, useId, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Facet, FilterGroupKey } from "../menu/menuTypes";

type FacetGroupProps = {
    facet: Facet;
    onToggle: (key: FilterGroupKey, value: string) => void;
};

const COLLAPSED_OPTION_COUNT = 8;

function FacetGroup({ facet, onToggle }: FacetGroupProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [query, setQuery] = useState("");
    const panelId = useId();

    const trimmedQuery = query.trim().toLowerCase();
    const matchingOptions = facet.options.filter((option) => option.label.toLowerCase().includes(trimmedQuery));
    const isTruncated = facet.isSearchable && !showAll && !trimmedQuery && matchingOptions.length > COLLAPSED_OPTION_COUNT;

    // ticked options always stay visible, even when the list is collapsed
    const visibleOptions = isTruncated
        ? matchingOptions.filter((option, index) => index < COLLAPSED_OPTION_COUNT || option.isSelected)
        : matchingOptions;

    const handleExpandToggle = () => setIsExpanded((expanded) => !expanded);
    const handleShowAllToggle = () => setShowAll((show) => !show);
    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

    if (!facet.options.length) return null;

    return (
        <fieldset className="facet">
            <legend className="sr-only">{facet.label}</legend>
            <button
                type="button"
                className="facet__header"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={handleExpandToggle}
            >
                <span>{facet.label}</span>
                <IoChevronDown className="facet__chevron" aria-hidden="true" />
            </button>

            {isExpanded && (
                <div id={panelId} className="facet__panel">
                    {facet.isSearchable && facet.options.length > COLLAPSED_OPTION_COUNT && (
                        <input
                            type="search"
                            className="facet__search"
                            placeholder={`Find ${facet.label.toLowerCase()}...`}
                            aria-label={`Find ${facet.label.toLowerCase()}`}
                            value={query}
                            onChange={handleQueryChange}
                        />
                    )}

                    <ul className="facet__options">
                        {visibleOptions.map((option) => {
                            const handleChange = () => onToggle(facet.key, option.value);

                            return (
                                <li key={option.value}>
                                    <label className="facet__option">
                                        <input
                                            type="checkbox"
                                            className="facet__checkbox"
                                            checked={option.isSelected}
                                            onChange={handleChange}
                                        />
                                        <span className="facet__label">{option.label}</span>
                                        <span className="facet__count">{option.count}</span>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>

                    {!visibleOptions.length && <p className="facet__empty">No matches</p>}

                    {facet.isSearchable && !trimmedQuery && matchingOptions.length > COLLAPSED_OPTION_COUNT && (
                        <button type="button" className="facet__more" onClick={handleShowAllToggle}>
                            {showAll ? "Show less" : `Show all ${matchingOptions.length}`}
                        </button>
                    )}
                </div>
            )}
        </fieldset>
    );
}

export default FacetGroup;
