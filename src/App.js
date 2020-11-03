import React from "react"
import Box from './components/box';

import gredient from './assets/images/gredient.svg';

function App() {
    return (
        <div className="app">
            <img src={ gredient } alt="gredient" className="app__background-item" />
            <div className="container">
                <h1 className="container__title">
                    Your account
                </h1>
                <Box />
            </div>
        </div>
    );
}

export default App;
