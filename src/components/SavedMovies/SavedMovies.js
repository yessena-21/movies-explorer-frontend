import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Header from '../Header/Header';
import LoadMore from '../LoadMore/LoadMore';
import Footer from '../Footer/Footer';
//0import mainApi from '../../utils/MainApi'

function Movies({ isLoading, windowWidth,
    loggedIn, isOpen, onClose, onClick, savedMovies, setIsCheckboxSelected,
    handleSaveMovie, handleSearch, handleDeleteMovie, moviesMessage, handleClearSearch,
    searchAllFilms, searchShortFilms, handleSetSavedCards, isCheckboxSelected, handleCheckBoxChange, isLiked
}) {


    // React.useEffect(() => {
    //     setIsCheckboxSelected(false)
    // },
    //     []);

    // React.useEffect(() => {
    //     mainApi.getInitialCards()
    //         .then((res) => handleSetSavedCards(res))
    //         .catch((err) => {
    //             console.log(err)
    //         });
    // },
    //     []);


    return (
        <main className='movies'>
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
                isSaved={true}/>
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
            <LoadMore />
            <Footer />

        </main>
    )
}

export default Movies;