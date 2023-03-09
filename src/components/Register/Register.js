import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import useValidator from "../hooks/useFormAndValidation";

import './Register.css'
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Register({ onRegister, showInfoTooltip, onlogin }) {
    const { values, errors, isValid, handleChange, setValues } = useValidator({});

    const handleSubmit = (e) => {

        e.preventDefault();
        onRegister(values)
            .then(() => onlogin(values))
            .then(() => showInfoTooltip(false))
            .catch((err) => showInfoTooltip(true, err));
    }
    return (
        <section className="register flex-column">

            <div className="logo-container">
                <Logo />
            </div>
            <form className="register-form" name="registerForm" onSubmit={handleSubmit} type="submit">
                <h2 className="register-form__title">Добро пожаловать</h2>
                <label className='register-form__input-label'>Имя
                    <input
                        name="name"
                        className="register-form__input"
                        required minLength="2"
                        aria-label="Поле для ввода имени"
                        onChange={handleChange}
                        value={values.name || ''}
                    />
                
                    <ErrorMessage isActive={!isValid} errorText={errors.name || ''} />
                </label>
                <label className='register-form__input-label'>E-mail
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        className="register-form__input"
                        value={values.email || ''}
                        required
                        aria-label="Поле для ввода почты"
                    />
                    <ErrorMessage isActive={!isValid} errorText={errors.email || ''} />
                </label>
                <label className='register-form__input-label'>Пароль
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        className="register-form__input"
                        value={values.password || ''}
                        placeholder="Пароль"
                        required
                        minLength="5"
                        aria-label="Поле для ввода пароля" />
                    <ErrorMessage isActive={!isValid} errorText={errors.password || ''} />
                </label>
                <button
                    type="submit"
                    className={`register-form__save-button  ${(!isValid) && 'register-form__save-button_disabled'}`}
                    disabled={!isValid}>Зарегистрироваться</button>
                <div className="register-form__text-container">
                    <span className='register-form__text'>Уже зарегистрированы?
                        <Link to="/signin" className='register-form__link'>Войти</Link>
                    </span>
                </div>
            </form >
        </section>
    )
}

export default Register;