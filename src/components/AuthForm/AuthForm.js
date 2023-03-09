import React from "react";
import { Link } from "react-router-dom";

import './AuthForm.css';
import useForm from "../hooks/useForm";

function AuthForm(props) {
    const { values, handleChange, setValues } = useForm({});
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(e);
        setValues({});
    };
    return (
        <form className="auth-form" name="authForm" onSubmit={handleSubmit} type="submit">
            <h2 className="auth-form__title">{props.title}</h2>
            {props.children}
            <section className="auth-form__section">
                <label className='auth-form__input-label'>E-mail</label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="auth-form__input"
                    value={values.email || ''}
                    required
                    aria-label="Поле для ввода почты"
                />
            </section>
            <section className="auth-form__section">
                <label className='auth-form__input-label'>Пароль</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className="auth-form__input"
                    value={values.password || ''}
                    placeholder="Пароль"
                    required
                    minLength="5"
                    aria-label="Поле для ввода пароля" />
            </section>
            {/* <button type="submit" className="auth-form__save-button">
                Войти
            </button> */}
            <button   type="submit" className={`auth-form__save-button ${props.isRegister ? 'auth-form__save-button_register' : 'auth-form__save-button_login'
                }`}>{props.button}</button>
            <div className="auth-form__text-container">
                <span className='auth-form__text'>{props.question}
                    <Link  to = {props.link} className='auth-form__link'>{props.answer}</Link>
                </span>
            </div>
        </form>

    )
}

export default AuthForm;