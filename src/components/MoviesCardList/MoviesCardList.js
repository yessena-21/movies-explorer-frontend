import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({ movies, handleSaveMovie,
    handleDeleteMovie, moviesMessage, isLiked, isSaved }) {

    const location = useLocation().pathname;
    return (
        <section className="movies-card-list">
            <div className="cards__list">
                {movies.length === 0
                    ? <p className='cards__not-found'>{moviesMessage}</p>
                    : ''}

                {movies.map(data => {

                    return (
                        <MoviesCard
                            key={data['id'] !== undefined ? data.id : data._id}
                            data={data}
                            handleSaveMovie={handleSaveMovie}
                            handleDeleteMovie={handleDeleteMovie}
                            isLiked={isLiked(data)}
                            isSaved={isSaved}
                        />
                    )
                })

                }
            </div>

        </section>
    )

}

export default MoviesCardList;