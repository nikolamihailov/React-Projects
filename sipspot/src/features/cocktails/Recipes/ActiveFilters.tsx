import { IoClose } from "react-icons/io5";
import { Facet, FilterGroupKey } from "@/features/cocktails/menu/menuTypes";

type ActiveFiltersProps = {
    facets: Facet[];
    ibaOnly: boolean;
    search: string;
    onRemove: (key: FilterGroupKey, value: string) => void;
    onIbaRemove: () => void;
    onSearchClear: () => void;
    onClearAll: () => void;
};

type Chip = {
    id: string;
    label: string;
    onRemove: () => void;
};

function ActiveFilters({ facets, ibaOnly, search, onRemove, onIbaRemove, onSearchClear, onClearAll }: ActiveFiltersProps) {
    const chips: Chip[] = facets.flatMap((facet) =>
        facet.options
            .filter((option) => option.isSelected)
            .map((option) => ({
                id: `${facet.key}-${option.value}`,
                label: `${facet.label}: ${option.label}`,
                onRemove: () => onRemove(facet.key, option.value),
            }))
    );

    if (ibaOnly) chips.unshift({ id: "iba", label: "IBA classics", onRemove: onIbaRemove });
    if (search.trim()) chips.unshift({ id: "search", label: `"${search.trim()}"`, onRemove: onSearchClear });

    if (!chips.length) return null;

    return (
        <div className="active-filters">
            <ul className="active-filters__list" aria-label="Active filters">
                {chips.map((chip) => (
                    <li key={chip.id}>
                        <button
                            type="button"
                            className="active-filters__chip"
                            aria-label={`Remove filter ${chip.label}`}
                            onClick={chip.onRemove}
                        >
                            {chip.label}
                            <IoClose aria-hidden="true" />
                        </button>
                    </li>
                ))}
            </ul>
            {chips.length > 1 && (
                <button type="button" className="active-filters__clear" onClick={onClearAll}>
                    Clear all
                </button>
            )}
        </div>
    );
}

export default ActiveFilters;
