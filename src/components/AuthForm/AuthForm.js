import React from "react";
import { Link } from "react-router-dom";

import './AuthForm.css';

function AuthForm(props) {
    return (
        <form className="auth-form" name="authForm">
            <h2 className="auth-form__title">{props.title}</h2>
            {props.children}
            <section className="auth-form__section">
                <label className='auth-form__input-label'>E-mail</label>
                <input type="email" name="email" className="auth-form__input" required
                    aria-label="Поле для ввода почты" />
            </section>
            <section className="auth-form__section">
                <label className='auth-form__input-label'>Пароль</label>
                <input type="password" name="password" className="auth-form__input" required minLength="5"
                    aria-label="Поле для ввода пароля" />
            </section>
            {/* <button type="submit" className="auth-form__save-button">
                Войти
            </button> */}
            <button className={`auth-form__save-button ${
              props.isRegister ? 'auth-form__save-button_register' : 'auth-form__save-button_login'
            }`}>{props.button}</button>
            <div className="auth-form__text-container">
                <span className='auth-form__text'>{props.question}
                    <Link className='auth-form__link'>{props.answer}</Link>
                </span>
            </div>
        </form>

    )
}

export default AuthForm;