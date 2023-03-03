class MoviesApi {
    constructor({ baseUrl, headers }) {
        this.link = baseUrl;
        this.headers = headers;
    }


    getMovies() {
        return this._request(`${this.link}/beatfilm-movies`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
    }


    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    _request(url, options) {
        return fetch(url, options).then(this._getResponseData)
    }
}

const headers = {
    'Content-Type': 'application/json',
};

const baseURL = 'https://api.nomoreparties.co';

const moviesApi = new MoviesApi({
    baseUrl: baseURL,
    headers: headers
});
export default moviesApi;