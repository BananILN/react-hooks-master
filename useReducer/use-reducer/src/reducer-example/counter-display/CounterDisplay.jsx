import React, {useContext} from 'react';
import {CountContext} from '../counter-context/CounterContext';
import './CounterDisplay.css';

export default function CounterDisplay() {
    const {state} = useContext(CountContext);

    return (
        <div className="count-display-container">
            Count: {state.count}
        </div>
    );
}