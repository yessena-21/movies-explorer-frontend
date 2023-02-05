import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__container'>
                <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                <div className='footer__copyright-container'>
                    <p className='footer__copyright'>© 2020</p>
                    <div className='footer__link-container'>
                        <a href='https://practicum.yandex.ru/' className='footer__link'>Яндекс.Практикум</a>
                        <a href='https://github.com/Yandex-Practicum?ysclid=l9voz8nwv7480346544' className='footer__link'>Github</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer