import DropdownItem from "./DropdownItem/DropdownItem";
import styles from "./DropdownSearch.module.css";

const DropdownSearch = ({ products, search, onClose }) => {
  return (
    <>
      {products?.length > 0 && (
        <>
          <div className="backdrop-search" onClick={onClose}></div>
          <div className={styles["dropdown-search-products"]}>
            {products.length > 0 &&
              products.slice(0, 5).map((p) => {
                return (
                  <DropdownItem
                    key={p._id}
                    {...p}
                    search={search}
                    onClose={onClose}
                  />
                );
              })}
            <div className={styles["searching-for"]}>
              <p>
                Searching for: <span>{search}</span>
              </p>
            </div>
          </div>
        </>
      )}
      {products?.length === 0 && search.trim() !== "" && (
        <>
          {" "}
          <div className="backdrop-search" onClick={onClose}></div>
          <div
            className={styles["dropdown-search-products"]}
            style={{ textAlign: "center" }}
          >
            <div style={{ padding: "15px", fontWeight: "bold" }}>
              No Products
            </div>
            <div className={styles["searching-for"]}>
              <p>
                Searching for: <span>{search}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DropdownSearch;
