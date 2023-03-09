import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import './Header.css';
import HeaderMain from '../Main/HeaderMain/HeaderMain'


function Header({loggedIn, onClick}) {
    return (
        <header className='header'>
            <div className="header__container">
                <Logo />
                {!loggedIn ? <HeaderMain /> : <Navigation  onClick={onClick}/>}
            </div>
        </header>

    )

}

export default Header;