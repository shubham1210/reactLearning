export function setUserDetails(response) {
    return { type: 'SSO_USER_ACTION', payload: response };
}