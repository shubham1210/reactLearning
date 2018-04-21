export default function headerReducer(state = { userName: '' }, action) {
    switch (action.type) {
        case 'SSO_USER_ACTION':
            {
                return Object.assign({}, state, { userName: action.payload });
            }
        default:
            return state;
    }
}
