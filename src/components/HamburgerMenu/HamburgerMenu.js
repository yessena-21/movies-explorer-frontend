import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './HamburgerMenu.css'

function HamburgerMenu({isOpen, onClose}){
    return(
        <section className={`gamburger-menu  ${
            isOpen ? "gamburger-menu_opened" : ""
          }`}>
            <div className='gamburger-menu__container'>
            <button
                onClick={onClose}
                type="button"
                className="gamburger-menu__close-button link">
            </button>
            <div className='gamburger-menu__links-container'>
                    <NavLink 
                    exact to='/' 
                    activeClassName='gamburger-menu__link_active' 
                    className='gamburger-menu__link link'
                    onClick={onClose}>
                        Главная
                    </NavLink>
                    <NavLink 
                    to='/movies' 
                    activeClassName='gamburger-menu__link_active' 
                    className='gamburger-menu__link link'
                    onClick={onClose}>
                        Фильмы
                    </NavLink>
                    <NavLink 
                    to='/saved-movies'
                     activeClassName='gamburger-menu__link_active' 
                     className='gamburger-menu__link link'
                     onClick={onClose}>
                        Сохранённые фильмы
                    </NavLink>
            </div>
            <Link 
            to='/profile' 
            className='gamburger-menu__link gamburger-menu__profile-link link'
            onClick={onClose}>
                Аккаунт
            </Link>
            </div>
            </section>
    )
}

export default HamburgerMenu;