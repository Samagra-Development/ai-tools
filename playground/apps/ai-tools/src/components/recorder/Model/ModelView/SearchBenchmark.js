import C from "../../../constants";

const action = (searchValue) => {
  return {
    type: C.SEARCH_BENCHMARK,
    payload: searchValue,
  };
};

export default action;
