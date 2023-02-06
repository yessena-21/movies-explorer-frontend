import React from 'react';
import './Promo.css'
import NavTab from '../NavTab/NavTab';

function Promo() {
    return(
        <section className="promo">
            <div className="promo__container flex-column" >
                <h2 className="promo__title"> Учебный проект студента факультета веб-разработки</h2>
                {/* <div className='navtab-container'>
                    <a href='#1' className='nav-link'>
                        О проекте
                    </a>
                    <a href='#2' className='nav-link'>
                        Технологии
                    </a>
                    <a href='#3' className='nav-link'>
                        Студент
                    </a>
                </div> */}
                <NavTab />
            </div>    
        </section>
    )

}

export default Promo;