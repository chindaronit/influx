export const SortLatest = (data) => {
  const getFilteredData = data.sort((a, b) => { 
    return parseInt(b.year, 10) - parseInt(a.year, 10);
  });
  
  return getFilteredData;
};
