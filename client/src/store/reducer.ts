import { ENABLE_EDITING, DISABLE_EDITING } from './actions';

type StateType = {
    isEdit: boolean;
};
type ActionType = {
    type: string;
    payload?: any;
};
const initialState: StateType = {
    isEdit: false,
};

const rootReducer = (state = initialState, { type, payload }: ActionType) => {
    switch (type) {
        case ENABLE_EDITING:
            return {
                ...state,
                isEdit: true,
            };
        case DISABLE_EDITING:
            return {
                ...state,
                isEdit: false,
            };

        default:
            return state;
    }
};

export default rootReducer;
