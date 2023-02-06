import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import Logo from "../Logo/Logo";

import './Register.css'

function Register() {

    return (
        <section className="register flex-column">

            <div className="logo-container">
                <Logo />
            </div>
            <AuthForm title={`Добро пожаловать!`}
                button={`Зарегистрироваться`}
                link={'/signin'}
                question={`Уже зарегистрированы?`}
                answer={`Войти`}
                isRegister={true}>

                <section className="auth-form__section">
                    <label className='auth-form__input-label'>Имя</label>
                    <input name="name" className="auth-form__input" required minLength="2"
                        aria-label="Поле для ввода имени" />
                </section>

            </AuthForm>

        </section>


    )
}

export default Register;