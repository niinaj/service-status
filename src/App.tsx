import React from 'react';

import WorldMap from './components/WorldMap';

import logo from './logo.svg';
import './assets/css/components/App.scss';

function App() {
  return (
    <div className="App">
      <div>
        <h1>Service Status</h1>
        <WorldMap />
      </div>
    </div>
  );
}

export default App;
