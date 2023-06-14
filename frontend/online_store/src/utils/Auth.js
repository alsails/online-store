const baseUrl = 'http://localhost:3001'

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
    return fetch(`${baseUrl}/${endpoint}`, options).then(checkResponse)
}

export const signup = (email, password, date) => {
    return request(`signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, date })
    })
};

export const signin = (email, password) => {
    return request(`signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    })
        .then((res) => {
            if (res.jwt) {
                localStorage.setItem('token', res.jwt);
            }
        })
};

export const checkToken = () => {
    return request(`users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(data => { return data })
}
