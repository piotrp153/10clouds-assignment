import React from "react"
import Form from './form';
import Navigation from './navigation';

import lines from '../assets/images/lines.png';

const Box = () => (
    <div className="box">
        <div className="box__image">
            <img src={ lines } alt="Lines" className="image__item"/>
        </div>
        <div className="box__content">
            <p className="content__text">
                Provide personal information so that we can <br />
                create a new account for you.
            </p>
            <Form />
        </div>
        <Navigation />
    </div>
)

export default Box