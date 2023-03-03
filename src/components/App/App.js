import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Main from '../Main/Main';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import auth from '../../utils/auth';
import api from '../../utils/MainApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isResponseFail, setIsResponseFail] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [token, setToken] = React.useState('');
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [infoMessage, setInfoMessage] = React.useState('');
  const [moviesMessage, setMoviesMessage] = React.useState('');
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(null);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const location = useLocation().pathname;
  const history = useHistory();

  const authorization = useCallback((jwt) => {
    return auth.checkToken(jwt).then((res) => {
      if (res) {
        handleCurrentUser();
        getSavedMovies()
        setLoggedIn(true);
        setName(res.name)
      }
    }).catch((err) => { console.log('ошибка проверки токена', err); });
  }, [])

  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');

  //   if (jwt) {
  //     authorization(jwt);
  //   }
  // }, []);


  // useEffect(() => {
  //   if (loggedIn) {
  //     history.push('/movies');
  //   }
  // }, [loggedIn]);


  function getToken() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      setToken(jwt);
      auth.checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
        })
        .catch(err => setMoviesMessage(err))
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setMovies([]);
    setSavedMovies([]);
    setName(null);
    setLoggedIn(false);
    localStorage.clear();
  }

  const onRegister = useCallback(({ name, email, password }) => {
    return auth.registration({ name, email, password }).then((res) => {
      return res;
    })
  }, [])

  const onLogin = ({ email, password }) => {
    setIsLoading(true)
    return auth.authorization({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setName(name);
        }
      })
      .finally(() => setIsLoading(false))
  }

  function closeHamburgerMenu() {
    setIsHamburgerMenuOpen(false)
  }

  function openHamburgerMenu() {
    setIsHamburgerMenuOpen(true)
  }

  const showInfoTooltip = (isError, err = null) => {
    if (err) console.log(err);
    setIsResponseFail(isError);
    setIsInfoTooltipOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }


  const handleCurrentUser = async () => {
    try {
      const userData = await api.getUserInfo();
      setCurrentUser(userData);
    } catch (e) {
      console.error(e);
    }
  }

  // редактируем пользователя
  const handleUpdateUser = async (data) => {
    setIsLoading(true);
    try {
      const userData = await api.setUserInfo(data);
      setCurrentUser(userData);
      closeAllPopups();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  // очищаем поиск
  function handleClearSearch() {


    location === '/movies'
      ? localStorage.removeItem('keyword')
      : localStorage.removeItem('keywordSaved');

    location === '/movies'
      ? setMoviesMessage('необходимо ввести ключевое слово')
      : setMoviesMessage('')

    location === '/movies'
      ? setMovies([])
      : setSavedMovies(savedMovies)
    location === '/movies'
      ? localStorage.removeItem('movies')
      : getSavedMovies()

  }

  // поиск фильмов
  function searchFilms(movies, keyword) {
    if (isCheckboxSelected === true) {
      const foundMovies = movies.filter(function (item) { return item.duration <= 40 && (item.description.toLowerCase().includes(keyword.toLowerCase()) || item.nameRU.toLowerCase().includes(keyword.toLowerCase())) });
      return foundMovies
    }
    else {
      const foundMovies = movies.filter(function (item) { return (item.description.toLowerCase().includes(keyword.toLowerCase()) || item.nameRU.toLowerCase().includes(keyword.toLowerCase())) });
      return foundMovies
    }
  }

  function searchAllFilms() {
    setIsCheckboxSelected(true);
    localStorage.setItem('isCheckboxSelected', true)
  }

  function searchShortFilms() {
    setIsCheckboxSelected(false);
    localStorage.setItem('isCheckboxSelected', false)
  }

  function searchNewFilms() {
    setIsLoading(true);

    const word = localStorage.getItem('keyword');
    const searchedMovies = searchFilms(initialMovies, word)
    if (searchedMovies.length === 0) {
      setMoviesMessage('ничего не найдено')
      setMovies([]);
    } else {
      localStorage.setItem('movies', JSON.stringify(searchedMovies));
      setMovies(searchedMovies);
    }
    setIsLoading(false)
  }

  function searchSavedFilms() {
    setIsLoading(true);

    const word = localStorage.getItem('keywordSaved');
    api.getInitialCards()
      .then((data) =>
        searchFilms(data, word))
      .then((res) => {

        if (res.length === 0) {
          setMoviesMessage('Ничего не найдено')
          setSavedMovies([]);
        } else {

          setSavedMovies(res);
        }
      })
      .catch((err) => setMoviesMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
      .finally(() => setIsLoading(false))
  }

  function handleSetSavedCards(movies) {
    setSavedMovies(movies)
  }

  /// конец работы с фильмами

  function getSavedMovies() {
    api.getInitialCards()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem('savedMovies', JSON.stringify(res));
      })
      .catch(() => {
        setSavedMovies([]);
      })
  }

  // new func
  function handleSaveMovie(movie) {
    api.saveMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
      })
      .catch((err) => {
        setInfoMessage((err));
      })
      .finally(() => setIsLoading(false))
  }

  function handleDeleteMovie(movie) {
    api.deleteMovie(movie)
      .then(() => {
        //setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
        // const newCard = savedMovies.filter((item) => item._id !== movie._id);
        // setSavedMovies(newCard);
        console.log(savedMovies);
        getSavedMovies();
      })
      .catch((err) => showInfoTooltip(true, err))
  }

  function isLiked(card) {
    return savedMovies.some((item) => item.movieId === card.id)
  }

  function handleLike(movie) {
    setIsLoading(true);
    api.getInitialCards()
      .then((movies) => {
        const savedMovie = movies.find(item => item.movieId === movie.id);

        if (savedMovie) {
          handleDeleteMovie(savedMovie._id);
        }
        else { handleSaveMovie(movie); }
      })
      .catch((err) => {
        showInfoTooltip(true, err)
      })
      .finally(setIsLoading(false))
  }

  // function handleSetSavedCards(cards){
  //   setSavedCards(cards)
  // }



  // ставим like и добавлем в нашу базу данных
  // function handleSaveMovie(movie) {
  //   setIsLoading(true);
  //   api.saveMovie(movie)
  //     .then(() => {
  //       getSavedMovies();
  //       const newSavedMovie = movies.find(item => item.id === movie.id);
  //       console.log('нашли фильм', newSavedMovie);
  //       newSavedMovie.saved = true;
  //       console.log('поставили лайк', newSavedMovie);
  //       setMovies(movies.map(item => item.id === newSavedMovie.id ? newSavedMovie : item));
  //       console.log('что получилось', movies);
  //       localStorage.setItem('movies', JSON.stringify(movies));
  //     })
  //     .catch((err) => {
  //       setInfoMessage((err));
  //       setMoviesMessage('У вас пока нет сохраненных фильмов')
  //     })
  //     .finally(() => setIsLoading(false))
  // }

  // убираем лайк и удаляем из базы данных на странице фильмов
  // function handleDeleteMovie(movie) {
  //   const deletedMovie = savedMovies.find((item) => item.movieId === movie.id);

  //   api.deleteMovie(deletedMovie._id)
  //     .then(() => {
  //       getSavedMovies();
  //       console.log(savedMovies);
  //       const deletedFilm = movies.find(item => item.id === movie.id);

  //       deletedFilm.saved = false;
  //       console.log('удадлили  лайк', deletedFilm);

  //       setMovies(movies.map(item => item.id === deletedFilm.id ? deletedFilm : item));
  //       console.log('test movies', movies, deletedFilm.id);
  //       localStorage.setItem('movies', JSON.stringify(movies));
  //     })
  //     .catch(err => setInfoMessage((err)))
  // }

  // удаляем из сохраненных фильмов
  function handleDeleteSavedMovie(movie) {
    api.deleteMovie(movie._id)
      .then(() => {
        getSavedMovies();
        const newMovies = savedMovies.filter(item => item !== movie);
        setSavedMovies(newMovies);
      })
      .catch(err => setInfoMessage((err)))
  }

  // восстанавливаем результаты поиска
  // React.useEffect(() => {
  //   const foundMovies = JSON.parse(localStorage.getItem('movies'));
  //   if (foundMovies !== null) {
  //     setMovies(foundMovies);
  //   }
  // },
  //   []);

  // восстанавливаем состояния переключателя корокометражек
  useEffect(() => {
    const checkboxStatus = JSON.parse(localStorage.getItem('isCheckboxSelected'));
    if (checkboxStatus) {
      setIsCheckboxSelected(checkboxStatus)
    }
    else {
      setIsCheckboxSelected(false)
    }
  },
    []);

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsEditProfilePopupOpen(false)
  }

  function handleEscClick(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function updateWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    window.addEventListener('keydown', handleEscClick);
    return () => {
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('keydown', handleEscClick);
    }
  })


  useEffect(() => {
    getToken();
    if (loggedIn) {
      const promises = [api.getUserInfo(), moviesApi.getMovies()]
      setIsLoading(true);
      Promise.all(promises)
        .then((res) => {
          const [userInfo, moviesList] = res;
          setCurrentUser(userInfo);
          localStorage.setItem('name', userInfo.name);
          localStorage.setItem('email', userInfo.email);
          if (localStorage.getItem('movies') === null) {
            setInitialMovies(moviesList);
          } else {
            setMovies(JSON.parse(localStorage.getItem('movies')));
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false))
    }
  }, [loggedIn])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isResponseFail={isResponseFail}
          onClose={closeAllPopups}
        />
        <Preloader isOpen={isLoading} />
        <Switch>
          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
              onClick={openHamburgerMenu}
              isOpen={isHamburgerMenuOpen}
              onClose={closeHamburgerMenu}
              windowWidth={windowWidth} />
          </Route>
          <Route path='/signin'>
            <Login
              onLogin={onLogin}
              showInfoTooltip={showInfoTooltip}
              isLoading={isLoading} />
          </Route>
          <Route path='/signup'>
            <Register
              onRegister={onRegister}
              showInfoTooltip={showInfoTooltip}
              isLoading={isLoading} />
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            movies={movies}
            isOpen={isHamburgerMenuOpen}
            loggedIn={loggedIn}
            onClick={openHamburgerMenu}
            onClose={closeHamburgerMenu}
            windowWidth={windowWidth}
            handleSearch={searchNewFilms}
            handleClearSearch={handleClearSearch}
            handleSaveMovie={handleLike}
            handleDeleteMovie={handleDeleteMovie}
            moviesMessage={moviesMessage}
            isLoading={isLoading}
            setIsCheckboxSelected={setIsCheckboxSelected}
            isCheckboxSelected={isCheckboxSelected}
            handleSetSavedCards={handleSetSavedCards}
            searchShortFilms={searchShortFilms}
            searchAllFilms={searchAllFilms}
            isLiked={isLiked}
            isSaved={false}

          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            savedMovies={savedMovies}
            isOpen={isHamburgerMenuOpen}
            loggedIn={loggedIn}
            onClick={openHamburgerMenu}
            onClose={closeHamburgerMenu}
            windowWidth={windowWidth}
            handleSearch={searchSavedFilms}
            handleDeleteMovie={handleDeleteSavedMovie}
            moviesMessage={moviesMessage}
            handleClearSearch={handleClearSearch}
            isLoading={isLoading}
            setIsCheckboxSelected={setIsCheckboxSelected}
            isCheckboxSelected={isCheckboxSelected}
            searchShortFilms={searchShortFilms}
            searchAllFilms={searchAllFilms}
            handleSetSavedCards={handleSetSavedCards}
            isSaved={true}
            isLiked={isLiked}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            isOpen={isHamburgerMenuOpen}
            loggedIn={loggedIn}
            onClick={openHamburgerMenu}
            onClose={closeHamburgerMenu}
            onUpdateUser={handleUpdateUser}
            onLogout={handleSignOut}
            onEditProfileClick={handleEditProfileClick}
          />
          <Route path="*">
            <NotFoundPage />
          </Route>

          <Route>
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Redirect to="/" />
            )}

          </Route>
        </Switch>

      </div>
    </CurrentUserContext.Provider>
  );

}

export default App;
