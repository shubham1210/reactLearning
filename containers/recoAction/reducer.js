export default function recoActionReducer(state = { aeList: [] }, action) {
    switch (action.type) {
        case 'AE_LIST':
            {
                return Object.assign({}, state, { aeList: action.payload });
            }
        default:
            return state;
    }
}
