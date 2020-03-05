import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SocketComp} from "./socket/SocketComp";

function App() {
    return (
        <div className="App">
            <SocketComp />
        </div>
    );
}

export default App;
