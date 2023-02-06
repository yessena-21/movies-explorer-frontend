import React from "react";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__container">
                <h2 className='portfolio__subtitle'>
                    Портфолио
                </h2>
                <ul className='portfolio__links'>
                    <li className='portfolio__link'>
                        <a href='https://github.com/yessena-21/how-to-learn' target='_blank' className='portfolio__link-text' rel="noreferrer">Статичный сайт</a>
                        <a href='https://github.com/yessena-21/how-to-learn' target='_blank' className='portfolio__link-text' rel="noreferrer">↗</a>
                    </li>
                    <li className='portfolio__link'>
                        <a href='https://yessena-21.github.io/russian-travel/' target='_blank' className='portfolio__link-text' rel="noreferrer">Адаптивный сайт</a>
                        <a href='https://yessena-21.github.io/russian-travel/' target='_blank' className='portfolio__link-text' rel="noreferrer">↗</a>
                    </li>
                    <li className='portfolio__link'>
                        <a href='https://github.com/yessena-21/react-mesto-api-full' target='_blank' className='portfolio__link-text' rel="noreferrer">Одностраничное приложение</a>
                        <a href='https://github.com/yessena-21/react-mesto-api-full' target='_blank' className='portfolio__link-text' rel="noreferrer">↗</a>
                    </li>
                </ul>
            </div>
        </section>
    )


}

export default Portfolio;