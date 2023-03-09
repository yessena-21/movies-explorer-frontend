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
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
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
      }
    }).catch((err) => { console.log('ошибка проверки токена', err); });
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      authorization(jwt);
    }
  }, [authorization]);


  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [history, loggedIn]);


  function getToken() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      setToken(jwt);
      auth.checkToken(token)
        .then(() => {
          console.log(' loginibsz', loggedIn);
          setLoggedIn(true);
        })
        .catch((err) => { console.log('ошибка проверки токена', err); })
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setMovies([]);
    setSavedMovies([]);
    setFoundSavedMovies([])
    setName(null);
    setLoggedIn(false);
    localStorage.clear();
  }
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

  const onRegister = useCallback(({ name, email, password }) => {
    return auth.registration({ name, email, password })
      .then((res) => {
        return res;
      })
  }, [])


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
      : setFoundSavedMovies(savedMovies)


    location === '/movies'
      ? localStorage.removeItem('movies')
      : getSavedMovies()

  }

  // поиск фильмов

  function handleResize(foundMovies) {
    if (windowWidth >= 1220) {
      setMovies(foundMovies.slice(0, 12))
    }
    if (windowWidth >= 800 && windowWidth < 1220) {
      setMovies(foundMovies.slice(0, 8))
    }
    if (windowWidth <= 500) {
      setMovies(foundMovies.slice(0, 5))
    }

  }
  function loadMoreMovies() {
    const foundMovies = JSON.parse(localStorage.getItem('movies'));
    if (foundMovies && windowWidth >= 1220) {
      setMovies(foundMovies.slice(0, movies.length + 3));
    }
    else if (foundMovies) {
      setMovies(foundMovies.slice(0, movies.length + 2));
    }
  }

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
    if (word) {
      const searchedMovies = searchFilms(initialMovies, word)
      if (searchedMovies.length === 0) {
        setMoviesMessage('ничего не найдено')
        setMovies([]);
      } else {
        localStorage.setItem('movies', JSON.stringify(searchedMovies));
        handleResize(searchedMovies);
        //setMovies(searchedMovies);
      }
    } else {
      setMovies([]);
      setMoviesMessage('Нужно ввести ключевое слово');
    }
    setIsLoading(false)
  }

  function searchSavedFilms() {
    setIsLoading(true);
    const word = localStorage.getItem('keywordSaved');
    getSavedMovies()
    if (word) {
      const searchedMovies = searchFilms(savedMovies, word)
      if (searchedMovies.length === 0) {
        setMoviesMessage('ничего не найдено')
        setFoundSavedMovies([]);
      } else {
        localStorage.setItem('savedMovies', JSON.stringify(searchedMovies));
        setFoundSavedMovies(searchedMovies);
      }
    }

    setIsLoading(false)
  }

  function handleSetSavedCards(movies) {
    setSavedMovies(movies)
  }

  function handleSetMovies(movies) {
    setMovies(movies)
  }
  /// конец работы с фильмами

  function getSavedMovies() {


    api.getInitialCards()
      .then((res) => {

        setSavedMovies(res);
        setFoundSavedMovies(res)
        console.log(' получаем сохраненные фильмы', savedMovies);
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
        setFoundSavedMovies([data, ...foundSavedMovies]);
      })
      .catch((err) => { console.log('ошибка проверки токена', err); })
      .finally(() => setIsLoading(false))
  }

  function handleDeleteMovie(movie) {
    api.deleteMovie(movie)
      .then(() => {
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

  // удаляем из сохраненных фильмов
  function handleDeleteSavedMovie(movie) {
    console.log('delete film', movie);
    api.deleteMovie(movie._id)
      .then(() => {
        //getSavedMovies();
        const newMovies = foundSavedMovies.filter(item => item !== movie);
        setSavedMovies(newMovies);
        setFoundSavedMovies(newMovies)
      })
      .catch((err) => { console.log('ошибка проверки токена', err); })
  }

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

  useEffect(() => {
    const foundMovies = JSON.parse(localStorage.getItem('movies'));
    if (foundMovies !== null) {
      handleResize(foundMovies);
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

      const promises = [api.getUserInfo(), moviesApi.getMovies(), api.getInitialCards()]
      setIsLoading(true);
      Promise.all(promises)
        .then((res) => {
          const [userInfo, moviesList, savedMovieslist] = res;
          setCurrentUser(userInfo);
          localStorage.setItem('name', userInfo.name);
          localStorage.setItem('email', userInfo.email);
          setSavedMovies(savedMovieslist);
          setFoundSavedMovies(savedMovieslist)
          console.log(savedMovies);

          if (localStorage.getItem('movies') === null) {
            setInitialMovies(moviesList);
          } else {
            handleResize(JSON.parse(localStorage.getItem('movies')))
            setInitialMovies(moviesList);
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
              isLoading={isLoading}
              onlogin={onLogin} />
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
            handleSetMovies={handleSetMovies}
            handleLoadMore={loadMoreMovies}
            handleResize={handleResize}

          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            savedMovies={foundSavedMovies}
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
