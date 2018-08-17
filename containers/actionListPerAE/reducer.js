export default function actionPerAeListReducer(state = { aePerActionList: [] }, action) {
    switch (action.type) {
        case 'ACTION_PER_AE_LIST':
            {
                return Object.assign({}, state, { aePerActionList: action.payload });
            }
        default:
            return state;
    }
}
