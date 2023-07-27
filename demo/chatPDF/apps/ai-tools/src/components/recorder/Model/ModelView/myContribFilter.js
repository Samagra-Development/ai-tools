import C from '../../../constants';

const action = (value, prop) => {
    return {
        type: C.GET_SELECTED_FILTER,
        payload: {
            value,
            prop
        }
    }
}

export default action;