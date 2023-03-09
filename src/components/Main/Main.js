import React from "react";
import './Main.css';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import AboutMe from "./AboutMe/AboutMe";
import Techs from "./Techs/Techs";
import Portfolio from "./Portfolio/Portfolio";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";



function Main({loggedIn,isOpen, onClose, onClick}) {
    return (
        <main className="main" >
            <HamburgerMenu isOpen={isOpen} onClose={onClose}/>
            <Header loggedIn={loggedIn} onClick={onClick}/> 
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </main>
    )
}

export default Main