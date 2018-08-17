export default function onOffReducer(state = { aeSelectionList:{} }, action) {
    switch (action.type) {
            case 'AE_SELECTION':
            return {
                ...state,
                aeSelectionList: {
                    ...state.aeSelectionList,
                    ...action.payload
                }
            }
            
        default:
            return state;
    }
}
