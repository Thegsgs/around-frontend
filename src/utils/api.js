export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._currentUser = this.getUserInfo();
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(console.log(res.status));
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res))
      .then((res) => {
        return res;
      });
  }

  uploadCard(title, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    })
      .then((res) => this._handleResponse(res))
      .then((cardObject) => {
        return cardObject;
      });
  }

  uploadProfileImg(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return res.json();
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res))
      .then((res) => {
        return res;
      });
  }

  getUserImg() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  uploadUserInfo({ name, job }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    })
      .then((res) => this._handleResponse(res))
      .then((res) => {
        return res;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res))
      .then((res) => {
        return res;
      });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res))
      .then((res) => {
        return res;
      });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res))
      .then((res) => {
        return res;
      });
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "bd66ac46-8c3d-415b-b4fe-d77bd0af375a",
    "Content-Type": "application/json",
  },
});
