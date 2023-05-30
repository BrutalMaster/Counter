import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [count, setCount] = useState(0);

    const fetchCounter = async () => {
        const res = await axios.get('http://localhost:3000/counter');
        setCount(res.data.count);
    }

    useEffect(() => {
        fetchCounter();
    }, []);

    const increment = async () => {
        const newCount = count + 1;
        await axios.post(`http://localhost:3000/counter/${newCount}`);
        setCount(newCount);
    };

    const decrement = async () => {
        const newCount = count - 1;
        await axios.post(`http://localhost:3000/counter/${newCount}`);
        setCount(newCount);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
}