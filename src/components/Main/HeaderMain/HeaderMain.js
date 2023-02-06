import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderMain.css';

function HeaderMain() {
    return (
        <div className='header-main'>
            <div className='header-main__links'>
                <Link to='/signup' className='sing-up-link link'>
                    Регистрация
                </Link>
                <Link to='/signin' className='sign-in-link link'>
                    Войти
                </Link>
            </div>
        </div>
    )
}

export default HeaderMain;