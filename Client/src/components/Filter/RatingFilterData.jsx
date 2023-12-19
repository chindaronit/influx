export const RatingFilterData = (data) => {
  const getFilteredData = data
    .filter((value) => parseFloat(value.rating) >= 8.0)
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  return getFilteredData;
};
