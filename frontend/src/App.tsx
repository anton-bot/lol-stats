import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';

function App() {
  // TODO FIXME: delete this, just testing CORS
  useEffect(() => {
    fetch('https://nxjjzmhurofxwtrejw4dpdokca0lcios.lambda-url.us-east-1.on.aws/?region=NA1&summoner=Doublelift');
  }, []);

  return (
    <div className="App">
      <header>
        <h1>LoL Stats</h1>
        <h2>Sample app showing summoner stats</h2>
      </header>
    </div>
  );
}

export default App;
