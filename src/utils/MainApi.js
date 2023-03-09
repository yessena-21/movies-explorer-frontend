

class Api {
    constructor({ baseUrl, headers }) {
        this.link = baseUrl;
        this.headers = headers;
    }

    getUserInfo() {
        return this._request(`${this.link}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
        })
    }

    setUserInfo(data) {
        return this._request(`${this.link}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
    }

    getInitialCards() {
        return this._request(`${this.link}/movies`, {
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
        })

    }

    saveMovie(movie) {
        const {
            country,
            director,
            duration,
            year,
            description,
            nameRU,
            nameEN,
          } = movie;

        return this._request(`${this.link}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(
                {
                    country,
                    director,
                    duration,
                    year,
                    description,
                    image: `${movieURL}${movie.image.url}`,
                    trailerLink: movie.trailerLink,
                    thumbnail: `${movieURL}${movie.image.formats.thumbnail.url}`,
                    nameRU,
                    nameEN,
                    movieId: movie.id,
                  }
            )
        })
    }

    deleteMovie(id) {
        return this._request(`${this.link}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('jwt')}`,
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

const baseURL = 'https://api.yesfilms.nomoredomains.club';
const movieURL = 'https://api.nomoreparties.co';

const api = new Api({
    baseUrl: baseURL,
    headers: headers
});
export default api;
