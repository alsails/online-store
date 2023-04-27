import React from "react";

class Api extends React.Component {
    constructor({ headers }) {
        super();
        this.headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(endpoint, options) {
        return fetch(`/${endpoint}`, options).then(this._checkResponse)
    }

    getCategories() {
        return this._request(`categories`, {
            method: 'GET',
            headers: this.headers
        })
    }
}

const api = new Api({
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;