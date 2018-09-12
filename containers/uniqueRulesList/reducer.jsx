export default function ruleListReducer(state = { rules: [] }, action) {
    switch (action.type) {
        case 'RULE_LIST':
            {
                return Object.assign({}, state, { rules: action.payload });
            }
        default:
            return state;
    }
}
