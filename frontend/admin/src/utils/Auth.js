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

export const signup = (formValue) => {
    return request(`admin/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
    })
};

export const signin = (login, password) => {
    return request(`admin/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ login, password }),
    })
        .then((res) => {
            if (res.jwt) {
                localStorage.setItem('token', res.jwt);
            }
        })
};

export const checkToken = () => {
    return request(`admin/staff/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(data => { return data })
}
