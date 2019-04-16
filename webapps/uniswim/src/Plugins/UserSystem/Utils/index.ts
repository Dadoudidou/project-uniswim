export const createCookie = async (token: string) => {
    return fetch(`${process.env.REACT_APP_USERS_BASEURL}/credentialCookie`, {
        method: "POST",
        body: JSON.stringify({
            token: token,
            expireInDays: 1
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export const testCookie = async () => {
    return fetch(`${process.env.REACT_APP_USERS_BASEURL}/credentialCookie`, {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => {
        if(res.status >= 200 && res.status < 400) return true;
        return false;
    })
    .catch(() => false)
}