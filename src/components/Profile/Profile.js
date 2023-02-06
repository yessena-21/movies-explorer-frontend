import React from "react";

import './Profile.css';

function Profile(props) {

    return (
        <section className="profile flex-column">

            <h2 className="profile__title">Привет, Виталий</h2>
            <form className='profile__form'>
                <label className='profile__form-label profile__form-label-type-name'>
                    Имя
                    <input className='profile__form-input profile__form-input-type-name' 
                       id='name-input'
                       placeholder={props.name}
                       />
                </label>
                <label className='profile__form-label'>
                    E-mail
                    <input className='profile__form-input profile__form-input-type-email' 
                        id='email-input'
                        placeholder={props.email}
                        />
                </label>
                <button type='submit' className='profile__form-submit-button button'>Редактировать</button>
            </form>
            <button type='button' className='profile__logout-button button'>Выйти из аккаунта</button>  

        </section>

    )
}

export default Profile;