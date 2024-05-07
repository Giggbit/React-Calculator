import { useReducer } from 'react';
import './Calculator.css';

const initialState = {
    result: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
        return { ...state, result: state.result + action.payload };
        case 'CLEAR':
        return { ...state, result: '' };
        case 'CALCULATE':
        try {
            return { ...state, result: eval(state.result).toString() };
        } catch (error) {
            return { ...state, result: 'Error' };
        }
        default:
        return state;
    }
};

function Calculator() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClick = (value) => {
        dispatch({ type: 'ADD', payload: value });
    };

    const clear = () => {
        dispatch({ type: 'CLEAR' });
    };

    const calculate = () => {
        dispatch({ type: 'CALCULATE' });
    };

    return (
        <div className="container">
        <div className="calc">
            <input type="text" value={state.result} readOnly />
            <div className="keypad">
            {[...Array(10).keys(), '.', '+', '-', '*', '/'].map(value => (
                <button key={value} onClick={() => handleClick(value)}>
                {value}
                </button>
            ))}
            <button onClick={clear}>Clear</button>
            <button onClick={calculate}>=</button>
            </div>
        </div>
        </div>
    );
}

export default Calculator;
