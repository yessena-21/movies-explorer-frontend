import React from "react";

import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Header from "../Header/Header";


function Profile({ loggedIn, onLogout, isOpen, onClick, onClose, onEditProfileClick }) {
    
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="profile">
            <HamburgerMenu isOpen={isOpen} onClose={onClose} />
            <Header loggedIn={loggedIn} onClick={onClick} />
            <section className="profile__container flex-column">
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <div className='profile__form' id='profile'>
                    <div className='profile__info'>
                        <label
                            className='profile__label'
                            htmlFor='name'>
                            Имя

                        </label>
                        <p className='profile__placeholder'>{currentUser.name}</p>
                    </div>
                    <div className="profile__info" >
                        <label
                            className='profile__label'
                            htmlFor='email'>
                            E-mail
                        </label>
                        <p className='profile__placeholder'>{currentUser.email}</p>
                    </div>
                    <button
                        className='profile__form-edit-button button'
                        form='profile'
                        type='button'
                        onClick={onEditProfileClick}
                    >Редактировать
                    </button>
                </div>
                <button
                    type='button'
                    className='profile__logout-button button'
                    onClick={onLogout}
                >Выйти из аккаунта
                </button>

            </section>
        </main>
    )
}

export default Profile;