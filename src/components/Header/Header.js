import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import './Header.css';
import HeaderMain from '../Main/HeaderMain/HeaderMain'


function Header(props) {
    return (
        <header className='header'>
            <div className="header__container">
                <Logo />
                {!props.LoggedIn ? <HeaderMain /> : <Navigation  onClick={props.onClick}/>}
            </div>
        </header>

    )

}

export default Header;