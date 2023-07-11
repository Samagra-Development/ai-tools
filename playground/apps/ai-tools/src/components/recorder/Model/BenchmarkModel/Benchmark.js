import C from '../../../constants';

const action = (updatedState) => {
    return {
        type: C.UPDATE_BENCHMARK_FILTER,
        payload: updatedState
    }
};

export const initialSearchFilter = () => {
    return {
        type: C.INITIAL_BENCHMARK_FILTER
    }
};

export default action;