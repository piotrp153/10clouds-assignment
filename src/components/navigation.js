import React from "react"

const Navigation = () => (
    <div className="box__navigation">
        <div className="navigation__item">
            <p className="item__text small">
                01
            </p>
        </div>
        <div className="navigation__item navigation__item--active">
            <p className="item__text small">
                02<br />
                Personal
            </p>
        </div>
        <div className="navigation__item">
            <p className="item__text small">
                03
            </p>
        </div>
    </div>
)

export default Navigation;