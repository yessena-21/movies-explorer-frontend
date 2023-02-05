import React from "react";

import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle'

function Techs() {
    return (
        <section className="techs" id="2">
            <div className="techs__container flex-column" >
                <SectionTitle> Технологии </SectionTitle>
                <div className="techs__text-container">
                    <h2 className="techs__title"> 7 технологий</h2>
                    <p className='techs__text'>
                        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                    </p>
                </div>
                <div className='techs__info-graphics'>
                    <div className='techs__info-graphics-tab'>
                        <p>HTML</p>
                    </div>
                    <div className='techs__info-graphics-tab'>
                        <p>CSS</p>
                    </div>
                    <div className='techs__info-graphics-tab'>
                        <p>JS</p>
                    </div>
                    <div className='techs__info-graphics-tab'>
                        <p>React</p>
                    </div>
                    <div className='techs__info-graphics-tab'>
                        <p>Git</p>
                    </div>
                    <div className='techs__info-graphics-tab'>
                        <p>Express.js</p>
                    </div>
                    <div className='techs__info-graphics-tab'>
                        <p>mongoDB</p>
                    </div>
                </div>


            </div>


        </section >
    )




}

export default Techs;
