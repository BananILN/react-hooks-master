import React from 'react'
import RenderCounter from './render-counter/RenderCounter';
import './TaskTwo.css';
import { useCallback, useMemo, useState, memo} from 'react';

export default function TaskTwo() {
    const update = useUpdate()

    
    return (
        <div className="TaskTwo">
            <button onClick={update}>Обновить компонент</button>
            {<RenderCounter />}
            <Root />
        </div>
    )
}

const Root = memo(() => {

    return (
        <form className="form-container">
            
            {<RenderCounter />}
            <Input />
        </form>
    )
})

const Input =  memo(() => {
    const [value, setValue] = useState('');

    const handleChange = useCallback((event) => {

        setValue(event.target.value);
    },[])
    return (
        <div className="input-container">
            <input type="text" className="input-field" name="value" onChange={handleChange} />
            Введенное значение: {value}
            {<RenderCounter />}
        </div>
    )
})

function useUpdate() {
    const [, setCount] = useState(0)
    return useCallback(()=>{
        setCount((prevCount) => prevCount + 1);
    },[])
}