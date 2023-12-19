import { SortLatest } from "./SortLatest";

export const FilterData = (data, section) => {
  const getFilteredData = data.filter((value) => {
    return (
      value.genre.toLowerCase().includes(section.toLowerCase()) &&
      parseFloat(value.rating) >= 7.0
    );
  });

  return SortLatest(getFilteredData);
};
