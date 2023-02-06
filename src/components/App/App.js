import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer'
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Route, Switch } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

function App() {

  
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = React.useState(false);

  function closeHamburgerMenu() {
    setIsHamburgerMenuOpen(false)
  }

  function openHamburgerMenu() {
    setIsHamburgerMenuOpen(true)
  }
  return (
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <HamburgerMenu isOpen={isHamburgerMenuOpen} onClose={closeHamburgerMenu}/>
          <Header isLogged={false} onClick={openHamburgerMenu}/>
          <Main />
          <Footer />
        </Route>
        <Route path='/movies'>
          <HamburgerMenu isOpen={isHamburgerMenuOpen} onClose={closeHamburgerMenu}/>
          <Header LoggedIn={true} onClick={openHamburgerMenu}/>
          <Movies />
          <Footer />
        </Route>
       <Route path='/saved-movies'>
          <HamburgerMenu isOpen={isHamburgerMenuOpen} onClose={closeHamburgerMenu}/>
          <Header LoggedIn={true} onClick={openHamburgerMenu}/>
          <SavedMovies/>
          <Footer/>
        </Route>
        <Route path='/profile'>
        <HamburgerMenu isOpen={isHamburgerMenuOpen} onClose={closeHamburgerMenu}/>
          <Header LoggedIn={true} onClick={openHamburgerMenu}/>
          <Profile name={`Виталий`} email={`pochta@yandex.ru`}/>
        </Route>
        <Route path='/signin'>
            <Login/>
        </Route>
        <Route path='/signup'>
            <Register/>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
