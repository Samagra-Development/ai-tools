import C from '../../../constants';

export default (searchValue) => {
    return {
        type: C.GET_SEARCHED_LIST,
        payload: searchValue
    }
}