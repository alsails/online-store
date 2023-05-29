import React from "react";

class Api extends React.Component {
    constructor({ props, baseUrl, headers }) {
        super(props);
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}, текст ошибки: ${res.message}`);
    }

    _request(endpoint, options) {
        return fetch(`${this.baseUrl}/${endpoint}`, options).then(this._checkResponse)
    }

    getCategories() {
        return this._request(`categories`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include',
        })
    }

    getGoods() {
        return this._request(`goods`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include',
        })
    }

    getSale() {
        return this._request(`sale`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include',
        })
    }

    getUserInfo() {
        return this._request(`users/me`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include',
        })
    }

    delLike(data) {
        return this._request(`goods/${data}/likes`, {
            method: 'DELETE',
            headers: this.headers,
            credentials: 'include',
        })
    }

    putLike(data) {
        return this._request(`goods/${data}/likes`, {
            method: 'PUT',
            headers: this.headers,
            credentials: 'include',
        })
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
});

export default api;