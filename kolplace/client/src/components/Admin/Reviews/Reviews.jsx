import { useCallback, useEffect, useState } from "react";
import { getAllWithFilters } from "../../../data/services/reviewService";
import FilterReviewsBySort from "../../Filters/AdminFilters/ReviewFilter/FilterReviewsBySort";
import AdminListPage from "../AdminListPage/AdminListPage";
import usePagination from "../../../hooks/usePagination";
import ReviewItem from "./ReviewItem/ReviewItem";
import DeleteReview from "./DeleteReview/DeleteReview";

const Reviews = () => {
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount, resetPage } =
    usePagination();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sortFilter, setSortFilter] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [pageSize, setPageSize] = useState(null);
  const onPageSizeChange = useCallback((size) => {
    setPageSize(size);
    resetPage();
  }, [resetPage]);

  useEffect(() => {
    if (!pageSize) return;
    getAllWithFilters(page, sortFilter, pageSize)
      .then((data) => {
        setReviews(data.reviews);
        updatePageCount(data.pageCount);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [updatePageCount, page, sortFilter, pageSize]);

  const updateReviews = useCallback((data) => setReviews(data), []);

  const openDelete = useCallback((id) => {
    setDeleteOpen(true);
    setSelectedReview(id);
  }, []);

  const onCloseDelete = useCallback(() => setDeleteOpen(false), []);

  const onSortFilterChange = useCallback((e) => {
    setSortFilter(e.target.value);
    resetPage();
  }, [resetPage]);

  return (
    <AdminListPage
      title="Reviews"
      filters={<FilterReviewsBySort onChange={onSortFilterChange} />}
      isLoading={isLoading}
      isEmpty={!reviews?.length}
      emptyText="No reviews"
      layout="list"
      rows={8}
      onPageSizeChange={onPageSizeChange}
      pagination={{ page, pageCount, prevPage, nextPage, switchToPage }}
      overlays={
        deleteOpen && (
          <DeleteReview onClose={onCloseDelete} updateReviews={updateReviews} id={selectedReview} />
        )
      }
    >
      {reviews?.map((r) => (
        <ReviewItem key={r._id} {...r} openDelete={openDelete} />
      ))}
    </AdminListPage>
  );
};

export default Reviews;
