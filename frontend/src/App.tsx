import './App.scss';
import { SearchByName } from './components/pages/SearchByName/SearchByName';
import { StatsContextProvider } from './state/StatsContext';

function App() {
  return (
    <div className="App">
      <StatsContextProvider>
        <SearchByName />
      </StatsContextProvider>
    </div>
  );
}

export default App;
