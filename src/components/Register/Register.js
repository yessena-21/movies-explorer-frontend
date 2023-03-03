import React from "react";
import { Link, useHistory } from "react-router-dom";
// import registerForm from "../registerForm/registerForm";
import Logo from "../Logo/Logo";
import useValidator from "../hooks/useFormAndValidation";

import './Register.css'
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Register({ onRegister, showInfoTooltip }) {
    const { values, errors, isValid, handleChange, setValues } = useValidator({});
    const history = useHistory();

    const handleSubmit = (e) => {

        e.preventDefault();
        onRegister(values)
            .then(setValues({}))
            .then(() => showInfoTooltip(false))
            .then(() => history.push('/signin'))
            .catch((err) => showInfoTooltip(true, err));
    }
    return (
        <section className="register flex-column">

            <div className="logo-container">
                <Logo />
            </div>
            { /*<registerForm title={`Добро пожаловать!`}
                button={`Зарегистрироваться`}
                link={'/signin'}
                question={`Уже зарегистрированы?`}
                answer={`Войти`}
                isRegister={true} 
                onSubmit={handleSubmit}
                type="submit"
                values={values}
                > */}

            <form className="register-form" name="registerForm" onSubmit={handleSubmit} type="submit">
                <h2 className="register-form__title">Добро пожаловать</h2>
                {/* <section className="register-form__section"> */}
                    <label className='register-form__input-label'>Имя
                    <input
                        name="name"
                        className="register-form__input"
                        required minLength="2"
                        aria-label="Поле для ввода имени"
                        onChange={handleChange}
                        value={values.name || ''}
                    />
                    {/* <span className="register-form__input-error register-form__input-error_active">{errors.name || ''}</span> */}
                    <ErrorMessage isActive={!isValid} errorText={errors.name || ''} />
                    </label>
                {/* </section> */}

                {/* <section className="register-form__section"> */}
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
                    {/* <span className="register-form__input-error register-form__input-error_active">{errors.email || ''}</span> */}
                    <ErrorMessage isActive={!isValid} errorText={errors.email || ''} />
                    </label>
                {/* </section> */}
                {/* <section className="register-form__section"> */}
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
                    {/* <span className="register-form__input-error register-form__input-error_active">{errors.password || ''}</span> */}
                    <ErrorMessage isActive={!isValid} errorText={errors.password || ''} />
                    </label>
                {/* </section> */}

                {/* </registerForm> */}


                <button
                 type="submit" 
                className={`register-form__save-button  ${(!isValid ) && 'register-form__save-button_disabled'}`}
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