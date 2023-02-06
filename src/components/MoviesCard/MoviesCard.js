import React from 'react';
import './MoviesCard.css';
import poster from '../../images/poster.jpg';


function MoviesCard(props) {
    return(
        <div className='movies-card'>
            <img src={poster} alt="poster" className='movies-card__poster'/>
            <div className='movies-card__container'>
                <div className='movies-card__description'>
                    <h2 className='movies-card__description-title'>33 слова о дизайне</h2>
                    <p className='movies-card__description-subtitle'>1ч 47м</p>
                </div>
                <button
                    type="button" className='movies-card__like-button'>
                </button>
            </div>
        </div>
    )
}

export default MoviesCard;