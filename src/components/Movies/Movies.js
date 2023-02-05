import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import LoadMore from '../LoadMore/LoadMore';
import './Movies.css'

function Movies() {
    return(
        <main className='movies'>
            <SearchForm />
            <MoviesCardList isSaved={false}/>
            <LoadMore />
                        
        </main>
    )
}

export default Movies;