import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import Logo from "../Logo/Logo";

import './Login.css';

function Login() {
    return (
        <section className="login flex-column">
            <div className="logo-container">
                <Logo />
            </div>
            <AuthForm
                title={`Рады видеть!`}
                button={`Войти`}
                link={'/signup'}
                question={`Еще не зарегистрированы?`}
                answer={`Регистрация`}
                isRegister={false} />
        </section>
    )

}

export default Login;
