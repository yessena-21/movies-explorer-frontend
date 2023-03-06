import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import LoadMore from '../LoadMore/LoadMore';
import './Movies.css'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Movies({ searchShortFilms, searchAllFilms, checked,
  handleCheckBoxChange, isLoading, loggedIn, isOpen, onClose,
  onClick, windowWidth, handleSearch, handleSaveMovie,
  handleDeleteMovie, movies, moviesMessage, handleClearSearch, setIsCheckboxSelected,
  isCheckboxSelected, handleSetMovies, isLiked, handleLoadMore, handleResize }) {



  React.useEffect(() => {
    const checkboxStatus = JSON.parse(localStorage.getItem('isCheckboxSelected'));
    if (checkboxStatus) {
      setIsCheckboxSelected(checkboxStatus)
    }
    else {
      setIsCheckboxSelected(false)
    }

    const moviesList = JSON.parse(localStorage.getItem('movies'));
    if (moviesList === null) {
      handleSetMovies([]);
    } else {
      handleResize(moviesList);
    }

  },
    []);


  return (
    <main className='main'>
      <HamburgerMenu isOpen={isOpen} onClose={onClose} />
      <Header loggedIn={loggedIn} onClick={onClick} />

      <SearchForm
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        windowWidth={windowWidth}
        handleCheckBoxChange={handleCheckBoxChange}
        isLoading={isLoading}
        isSelected={isCheckboxSelected}
        searchShortFilms={searchShortFilms}
        searchAllFilms={searchAllFilms}
        isSaved={false} />
      <section className='movies'>
        <MoviesCardList
          movies={movies}
          windowWidth={windowWidth}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          moviesMessage={moviesMessage}
          checked={checked}
          isSaved={false}
          isLiked={isLiked}
        />
        <LoadMore onMoreClick={handleLoadMore} movies={movies}></LoadMore>
      </section>

      <Footer />
    </main>
  )
}

export default Movies;