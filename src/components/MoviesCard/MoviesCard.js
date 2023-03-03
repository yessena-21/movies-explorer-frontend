import React from 'react';
import './MoviesCard.css';
import poster from '../../images/poster.jpg';
import { useLocation } from 'react-router-dom';

function MoviesCard({ data, handleSaveMovie, handleDeleteMovie, isLiked, isSaved }) {
 
    const location = useLocation().pathname;
   
    function handleCardLike(e) {
        console.log('deletim cards');
        
        handleSaveMovie(data);
    }

    // function handleDelete(e) {
    //     props.deleteCard(props.card);
    // }



    // function handleSave() {

    //     handleSaveMovie(data);
    // }

    function handleDelete() {
        console.log('удаляем кино');
        handleDeleteMovie(data);
    }

    function handleImageClick() {
        location === '/movies'
            ? window.open(data.trailerLink, '_blank')
            : window.open(data.trailer, '_blank')
    }

    const cardLikeButtonClassName = `movies-card__like-button ${
        isLiked ? "movies-card__like-button_active" : " "
      }`;

    const cardButtonClassName = `movies-card__delete-button`

    return (
        <div className='movies-card'>
            {location === '/saved-movies'
        ? <img
          className='movies-card__poster'
          src={data.image !== null ? data.image : poster}
          alt={data.nameRU}
          onClick={handleImageClick}
        />
        : <img
          className='movies-card__poster'
          src={data.image !== null ? `https://api.nomoreparties.co${data.image.url}` : poster}
          alt={data.nameRU}
          onClick={handleImageClick}
        />
      }
            {/* <img src={data.image !== null ? `https://api.nomoreparties.co${data.image.url}` : poster} alt={data.nameRU}
                onClick={handleImageClick} className='movies-card__poster' /> */}
            <div className='movies-card__container'>
                <div className='movies-card__description'>
                    <h2 className='movies-card__description-title'>{data.nameRU}</h2>
                    <p className='movies-card__description-subtitle'>{`${Math.floor(data.duration / 60)}ч ${data.duration % 60}м`}</p>
                </div>
                <button
                    type="button"
                    className={isSaved ? cardButtonClassName : cardLikeButtonClassName}
                    onClick={isSaved ? handleDelete : handleCardLike}>
                </button>

                {/* {(location === '/movies' && data.saved === true)
                    &&
                    <button
                        className={`movies-card__like-button ${ data.saved ? 'movies-card__like-button_active': ''}`}
                        type='button'
                        onClick={handleDelete}
                    >
                    </button>}
                {(location === '/movies' && data.saved !== true)
                    &&
                    <button
                        className={`movies-card__like-button ${ data.saved ? 'movies-card__like-button_active': ''}`}
                        type='button'
                        onClick={handleSave}
                    >
                    </button>}
                {location === '/saved-movies'
                    &&
                    <button
                        className='movies-card__delete-button'
                        type='button'
                        onClick={handleDelete}
                    />} */}

            </div>
        </div>
    )
}

export default MoviesCard;