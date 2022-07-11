class Auth {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log(res);
      return res.json();
    }
    console.log(res);
    return Promise.reject(res.status);
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ 
        email: email, 
        password: password 
      }),
    })
    .then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ 
        email: email, 
        password: password 
      }),
    })
    .then(this._checkResponse);
  }

  getToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
          "Accept": "application.json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  }
}

export const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});
