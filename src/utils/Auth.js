class Auth {
  constructor(options) {
    this._baseUrl = options._baseUrl;
  }

  _getResponseData(res) {
    return res.ok
      ? res.json()
      : Promise.reject('Error: ' + res.status + res.statusText);
  }

  signup = ({ email, password }) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: password, email: email }),
    }).then((res) => this._getResponseData(res));
  };

  signin = ({ email, password }) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password, email: email }),
    }).then((res) => this._getResponseData(res));
  };

  tokenCheck = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  };
}

const AuthApi = new Auth({ _baseUrl: 'https://auth.nomoreparties.co' });
export default AuthApi;
