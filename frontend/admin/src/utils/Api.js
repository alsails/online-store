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

    getUsers() {
        return this._request(`users`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include',
        })
    }

    getStaffs() {
        return this._request(`admin/staff`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include',
        })
    }

    delStaff(data) {
        return this._request(`admin/staff/${data}`, {
            method: 'DELETE',
            headers: this.headers,
            credentials: 'include',
        })
    }

    changeOrders({_id, status}) {
        return this._request(`orders`, {
            method: 'PATCH',
            body: JSON.stringify({
                _id, status
            }),
            headers: this.headers,
            credentials: 'include',
        })
    }

    changeUserInfo(data) {
        return this._request(`users/me`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                phone_number: data.phone_number
            }),
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

    postCarts(data) {
        return this._request(`carts`, {
            method: 'POST',
            body: JSON.stringify({
                good: data
            }),
            headers: this.headers,
            credentials: 'include',
        })
    }

    getCarts() {
        return this._request(`carts`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include',
        })
    }

    changeQuantity(data) {
        return this._request(`carts/quantity`, {
            method: 'PATCH',
            body: JSON.stringify({
                _id: data._id,
                quantity: data.quantity
            }),
            headers: this.headers,
            credentials: 'include',
        })
    }

    delCart(data) {
        console.log(data)
        return this._request(`carts/${data}`, {
            method: 'DELETE',
            headers: this.headers,
            credentials: 'include',
        })
    }

    getOrders() {
        return this._request(`orders`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include',
        })
    }

    addOrders(data) {
        return this._request(`orders`, {
            method: 'POST',
            body: JSON.stringify({
                good: data
            }),
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
});

export default api;