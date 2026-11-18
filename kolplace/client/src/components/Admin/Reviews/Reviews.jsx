import { useCallback, useEffect, useState } from "react";
import { getAllWithFilters } from "../../../data/services/reviewService";
import FilterReviewsBySort from "../../Filters/AdminFilters/ReviewFilter/FilterReviewsBySort";
import styles from "./Reviews.module.css";
import usePagination from "../../../hooks/usePagination";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";
import ReviewItem from "./ReviewItem/ReviewItem";
import DeleteReview from "./DeleteReview/DeleteReview";

const Reviews = () => {
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount } =
    usePagination();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sortFilter, setSortFilter] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    getAllWithFilters(page, sortFilter)
      .then((data) => {
        setReviews(data.reviews);
        updatePageCount(data.pageCount);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [updatePageCount, page, sortFilter]);

  const updateReviews = useCallback((data) => setReviews(data), []);

  const openDelete = useCallback((id) => {
    setDeleteOpen(true);
    setSelectedReview(id);
  }, []);

  const onCloseDelete = useCallback(() => setDeleteOpen(false), []);

  const onSortFilterChange = useCallback(
    (e) => setSortFilter(e.target.value),
    []
  );

  return (
    <section className={styles["admin-reviews"]}>
      <h1>All reviews</h1>
      <div className={styles["admin-reviews-top"]}>
        <FilterReviewsBySort onChange={onSortFilterChange} />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <motion.div layout className={styles["admin-reviews-container"]}>
          <AnimatePresence>
            {reviews?.length > 0 ? (
              reviews.map((r) => (
                <ReviewItem key={r._id} {...r} openDelete={openDelete} />
              ))
            ) : (
              <h2>No reviews</h2>
            )}
          </AnimatePresence>
        </motion.div>
      )}
      {deleteOpen && (
        <DeleteReview
          onClose={onCloseDelete}
          updateReviews={updateReviews}
          id={selectedReview}
        />
      )}
      {pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          prevPage={prevPage}
          nextPage={nextPage}
          switchToPage={switchToPage}
        />
      )}
    </section>
  );
};

export default Reviews;
