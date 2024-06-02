import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useDevicePlatform from './hooks/useDevicePlatform';
import { useContext } from 'react';
import UserContext from './context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { increment, decrement } from './redux/counterSlice';

function App() {

  const dispatch = useDispatch();

  const countValue: number = useSelector((state: RootState) => state.counter.value);

  const { loggedInUser } = useContext(UserContext);

  const [count, setCount] = useState(0);
  const [username, setUsername] = useState<string>(loggedInUser);

  const devicePlatform = useDevicePlatform();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Below counter is using react-redux</p>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {countValue}
        </button>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          You're using this website on a {devicePlatform}.
        </p>
        <p>
          Username - {loggedInUser}
        </p>
        <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
