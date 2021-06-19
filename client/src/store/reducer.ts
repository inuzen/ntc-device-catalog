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
            console.log(payload);
            return {
                ...state,
                isEdit: true,
            };
        case DISABLE_EDITING:
            console.log(payload);
            return {
                ...state,
                isEdit: false,
            };

        default:
            return state;
    }
};

export default rootReducer;
