import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
    return (
        <div className='navigation'>
            <div className='navigation__button' onClick={props.onClick}></div>
            <div className='navigation__container'>
                <div className='nav-container'>
                    <NavLink to='/movies' activeClassName='navigation__link_active' className='navigation__link'>
                        Фильмы
                    </NavLink>
                    <NavLink to='/saved-movies' activeClassName='navigation__link_active' className='navigation__link'>
                        Сохранённые фильмы
                    </NavLink>
                </div>
                <Link to='/profile' className='navigation__link navigation__profile-link'>
                    Аккаунт
                </Link>
            </div>
        </div>
    )
}

export default Navigation;