import React from "react";

import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle'

function AboutProject() {
    return (

        <section className="about-project" id="1">
            <div className="about-project__container flex-column">

                <SectionTitle> О проекте </SectionTitle>

                <div className="about-project__text-container">
                    <div className='about-project__two-columns'>
                        <h2 className='about-project__text-title'>
                            Дипломный проект включал 5 этапов
                        </h2>
                        <p className='about-project__text'>
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </div>
                    <div className='about-project__two-columns'>
                        <h2 className='about-project__text-title'>
                            На выполнение диплома ушло 5 недель
                        </h2>
                        <p className='about-project__text'>
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
                            защититься.
                        </p>
                    </div>
                </div>
                <div className='about-project__timeline'>
                    <div className='about-project__timeline-tab'>
                        <div className='about-project__timeline-backend-tab'>
                            <p className='about-project__timeline-title'>
                                1 неделя
                            </p>
                        </div>
                        <div className='about-project__timeline-subtitle'>
                            <p>
                                Back-end
                            </p>
                        </div>
                    </div>
                    <div className='about-project__timeline-tab'>
                        <div className='about-project__timeline-frontend-tab'>
                            <p className='about-project__timeline-title'>
                                4 недели
                            </p>
                        </div>
                        <div className='about-project__timeline-subtitle'>
                            <p>
                                Front-end
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default AboutProject;