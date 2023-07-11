import C from "../../../constants";

export const filterBenchmark = (selectedFilters) => {
  return { type: C.FILTER_BENCHMARK, payload: selectedFilters };
};

export const clearFilterBenchmark = () => {
  return { type: C.CLEAR_FILTER_BENCHMARK };
};
