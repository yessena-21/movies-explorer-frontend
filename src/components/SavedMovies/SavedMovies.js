import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Movies({ isLoading, windowWidth,
    loggedIn, isOpen, onClose, onClick, savedMovies, setIsCheckboxSelected,
    handleSaveMovie, handleSearch, handleDeleteMovie, moviesMessage, handleClearSearch,
    searchAllFilms, searchShortFilms, isCheckboxSelected, handleCheckBoxChange, isLiked
}) {

    React.useEffect(() => {
        const checkboxStatus = JSON.parse(localStorage.getItem('isCheckboxSelected'));
        if (checkboxStatus) {
          setIsCheckboxSelected(checkboxStatus)
        }
        else {
          setIsCheckboxSelected(false)
        }}
, [])

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
                isSaved={true} />
           <section className='movies'>     
            <MoviesCardList
                movies={savedMovies}
                isSaved={true}
                isLoading={isLoading}
                windowWidth={windowWidth}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                moviesMessage={moviesMessage}
                isLiked={isLiked}

            />
            </section>
            <Footer />

        </main>
    )
}

export default Movies;