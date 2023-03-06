import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import LoadMore from "../LoadMore/LoadMore";


function MoviesCardList({ movies, windowWidth, handleSaveMovie,
    handleDeleteMovie, moviesMessage, isLiked, isSaved }) {


    const [renderedMoviesList, setRenderedMoviesList] = React.useState([]);
    const [isButtonActive, setIsButtonActive] = React.useState(false);
    const [renderedCardsCount, setRenderedCardsCount] = React.useState(12);
    const [addedCardsCount, setAddedCardsCount] = React.useState(0);

    const location = useLocation().pathname;

    // function cardsCount() {
    //     if (windowWidth >= 1100) {
    //         setRenderedCardsCount(12);
    //         setAddedCardsCount(3);
    //     } else if (windowWidth < 1100 && windowWidth > 600) {
    //         setRenderedCardsCount(8);
    //         setAddedCardsCount(2);
    //     } else {
    //         setRenderedCardsCount(5);
    //         setAddedCardsCount(2);
    //     }
    // }
    // function handleMoreClick() {
    //     setRenderedMoviesList(movies.slice(0, renderedMoviesList.length + addedCardsCount));
    //     if (renderedMoviesList.length >= movies.length - addedCardsCount) {
    //         setIsButtonActive(false);
    //     }
    // }

    // React.useEffect(() => {
    //     cardsCount();
    // }, [windowWidth]);

    // React.useEffect(() => {
    //     console.log('какая-то', movies);
    //     if (location === '/movies') {
    //         setRenderedMoviesList(movies.slice(0, renderedCardsCount));
    //         if (movies.length <= renderedCardsCount) {
    //             setIsButtonActive(false);
    //         } else {
    //             setIsButtonActive(true);
    //         }
    //     } else {
    //         setRenderedMoviesList(movies);
    //         setIsButtonActive(false);
    //     }
    // }, [movies]);


    return (
        <section className="movies-card-list">
            <div className="cards__list">
                {movies.length === 0
                    ? <p className='cards__not-found'>{moviesMessage}</p>
                    : ''}

                {movies.map(data => {

                    return (
                        <MoviesCard
                            key={location === '/movies' ? data.id : data._id}
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