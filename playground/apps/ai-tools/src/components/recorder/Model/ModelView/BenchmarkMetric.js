import C from "../../../constants";

const action = (type, index, parentIndex) => {
  if (type === "METRIC") {
    return {
      type: C.SELECT_METRIC,
      payload: { index, parentIndex },
    };
  }
  return {
    type: C.SELECT_DATASET,
    payload: { index, parentIndex },
  };
};

export default action;
