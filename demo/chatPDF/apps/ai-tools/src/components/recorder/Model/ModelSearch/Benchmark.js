import C from '../../../constants';

const action = (updatedState) => {
    return {
        type: C.UPDATE_SEARCH_FILTER,
        payload: updatedState
    }
};

export const initialSearchFilter = () => {
    return {
        type: C.INITIAL_SEARCH_FILTER
    }
};

export default action;