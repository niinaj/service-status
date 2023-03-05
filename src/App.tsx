import React from 'react';

import WorldMap from './components/WorldMap';

import logo from './logo.svg';
import './assets/css/components/App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1>Hi world!</h1>
          Edit <code>src/App.tsx</code> and save to reload.
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h2>The map</h2>
        <WorldMap />
      </div>
    </div>
  );
}

export default App;
