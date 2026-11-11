import classNames from "classnames";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../../shared/components/UI/Button/Button";
import { Facet, FilterGroupKey } from "../menu/menuTypes";
import FacetGroup from "./FacetGroup";

type FilterPanelProps = {
    facets: Facet[];
    ibaOnly: boolean;
    ibaCount: number;
    activeCount: number;
    resultsCount: number;
    isOpen: boolean; // mobile drawer state - on desktop the panel is always visible
    onToggle: (key: FilterGroupKey, value: string) => void;
    onIbaToggle: () => void;
    onClearAll: () => void;
    onClose: () => void;
};

export const FILTER_PANEL_ID = "menu-filters";

function FilterPanel({
    facets,
    ibaOnly,
    ibaCount,
    activeCount,
    resultsCount,
    isOpen,
    onToggle,
    onIbaToggle,
    onClearAll,
    onClose,
}: FilterPanelProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // mobile drawer: focus it, lock page scroll and close on Escape while open
    useEffect(() => {
        if (!isOpen) return;

        closeButtonRef.current?.focus();
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <>
            <div
                className={classNames("menu-filters__overlay", { "menu-filters__overlay--visible": isOpen })}
                aria-hidden="true"
                onClick={onClose}
            />
            <aside
                id={FILTER_PANEL_ID}
                className={classNames("menu-filters", { "menu-filters--open": isOpen })}
                aria-label="Filters"
            >
                <div className="menu-filters__header">
                    <h2 className="menu-filters__title">Filters</h2>
                    {activeCount > 0 && (
                        <button type="button" className="menu-filters__clear" onClick={onClearAll}>
                            Clear all ({activeCount})
                        </button>
                    )}
                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="menu-filters__close"
                        aria-label="Close filters"
                        onClick={onClose}
                    >
                        <IoClose aria-hidden="true" />
                    </button>
                </div>

                <div className="menu-filters__body">
                    <label className="menu-filters__toggle">
                        <input type="checkbox" className="facet__checkbox" checked={ibaOnly} onChange={onIbaToggle} />
                        <span className="facet__label">
                            IBA classics only
                            <small>Official cocktails of the International Bartenders Association</small>
                        </span>
                        <span className="facet__count">{ibaCount}</span>
                    </label>

                    {facets.map((facet) => (
                        <FacetGroup key={facet.key} facet={facet} onToggle={onToggle} />
                    ))}
                </div>

                <div className="menu-filters__footer">
                    <Button el="button" type="medium" variant="primary" onClickFunc={onClose}>
                        Show {resultsCount} {resultsCount === 1 ? "drink" : "drinks"}
                    </Button>
                </div>
            </aside>
        </>
    );
}

export default FilterPanel;
