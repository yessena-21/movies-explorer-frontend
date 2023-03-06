import React from 'react';
import './LoadMore.css';

function LoadMore({onMoreClick, movies}) {
    const foundMovies = JSON.parse(localStorage.getItem('movies'))

    const isButtonActive = foundMovies && movies.length < foundMovies.length;

    return(
        isButtonActive &&
        <section className='load-more'>
            <button className='load-more__button' onClick={onMoreClick}>
                Ещё
            </button>
        </section>
    )
}

export default LoadMore;