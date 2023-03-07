import React from "react";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import useValidator from "../hooks/useFormAndValidation";
import Logo from "../Logo/Logo";
import Preloader from "../Preloader/Preloader";

import './Login.css';

function Login({ onLogin, showInfoTooltip,isLoading }) {
    const { values, errors, isValid, handleChange, setValues } = useValidator({});
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(values)
            .then(() => history.push('/movies'))
            .catch((err) => showInfoTooltip(true, err));
    };
    
    return (
        <section className="login flex-column">
           
            <div className="logo-container">
                <Logo />
            </div>
            {/* <loginForm
                title={`Рады видеть!`}
                button={`Войти`}
                link={'/signup'}
                question={`Еще не зарегистрированы?`}
                answer={`Регистрация`}
                isRegister={false} /> */}
            <form className="login-form" name="loginForm" onSubmit={handleSubmit} type="submit">
                <h2 className="login-form__title">Рады видеть!</h2>
                <label className='login-form__input-label'>E-mail
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        className="login-form__input"
                        value={values.email || ''}
                        required
                        aria-label="Поле для ввода почты"
                    />
                    {/* <span className="login-form__input-error login-form__input-error_active">{errors.email || ''}</span> */}
                    <ErrorMessage isActive={!isValid} errorText={errors.email || ''} />
                </label>

                <label className='login-form__input-label'>Пароль
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        className="login-form__input"
                        value={values.password || ''}
                        placeholder="Пароль"
                        required
                        minLength="5"
                        aria-label="Поле для ввода пароля" />
                    {/* <span className="login-form__input-error login-form__input-error_active">{errors.password || ''}</span> */}
                    <ErrorMessage isActive={!isValid} errorText={errors.password || ''} />
                </label>

                {/* <button type="submit" className="login-form__save-button">
                Войти
            </button> */}
                <button
                    type="submit"
                    className={`login-form__save-button ${(!isValid) && 'login-form__save-button_disabled'}`}
                    disabled={!isValid}
                >{isLoading ? 'Вход...' : 'Войти'}</button>
                <div className="login-form__text-container">
                    <span className='login-form__text'>Еще не зарегистрированы?
                        <Link to="/signup" className='login-form__link'>Регистрация</Link>
                    </span>
                </div>
            </form>
        </section>
    )

}

export default Login;
