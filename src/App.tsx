import React from 'react';

import WorldMap from './components/WorldMap';

import logo from './logo.svg';
import './assets/css/components/App.scss';

function App() {
  return (
    <div className="App">
      <div>
        <h2>The map</h2>
        <WorldMap />
      </div>
    </div>
  );
}

export default App;
