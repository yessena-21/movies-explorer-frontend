import React from 'react';
import './LoadMore.css';

function LoadMore({isButtonActive, onMoreClick}) {
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