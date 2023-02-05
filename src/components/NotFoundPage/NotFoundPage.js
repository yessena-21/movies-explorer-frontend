import React from "react";
import { Link } from "react-router-dom";
import './NotFoundPage.css'

function NotFoundPage(){

    return (
        <section className='page-not-found flex-column'>
        <h2 className='page-not-found__title'>404</h2>
        <h3 className='page-not-found__subtitle'>Страница не найдена</h3>
        <Link to='/' className='page-not-found__link'>Назад</Link>
    </section>

    )
}

export default NotFoundPage;