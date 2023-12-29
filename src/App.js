import ButtonsPart from './components/ButtonsPart';
import Line from './components/Line';
import ResultScreen from './components/ResultScreen';
import Screen from './components/Screen';
import { ValuesProvider } from './context/valuesContext';
import './css/App.css';

function App() {
  return (
    <ValuesProvider>
      <div className="App">
        <Screen>
          <ResultScreen />
          <ButtonsPart />
          <Line />
        </Screen>
      </div>
    </ValuesProvider>
  );
}

export default App;
