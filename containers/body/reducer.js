export default function bodyReducer(state = { rules: [] }, action) {
    switch (action.type) {
        case 'RULE_LIST':
            {
                return Object.assign({}, state, { rules: action.payload });
            }
        default:
            return state;
    }
}
