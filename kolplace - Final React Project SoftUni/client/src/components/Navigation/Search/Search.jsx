import styles from "./Search.module.css";

const Search = () => {
  return (
    <form>
      <div className={styles["search-bar"]}>
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          required
        />
      </div>
    </form>
  );
};

export default Search;
