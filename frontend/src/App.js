import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const getDateApi = async() => {
    const { data } = await axios.get('/api/test-with-current-user')
    console.log(data)
  }

  const getDateAuth = async() => {
    const { data } = await axios.get('/auth/api/test-with-api-data')
    console.log(data)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello Develop
          Edit <code>src/App.js</code> and save to reload new text.
          develop
          and
          websockets
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={getDateApi}>
          Click me and get API data
        </button>
        <button onClick={getDateAuth}>
          Click me and get Auth API data
        </button>
      </header>
    </div>
  );
}

export default App;
