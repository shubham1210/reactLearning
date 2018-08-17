export function setAEList(response) {
    return { type: 'AE_LIST', payload: response };
}

export function setSelectionMade(response) {
    return { type: 'AE_SELECTION', payload: response };
}