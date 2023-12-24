import ButtonsPart from './components/ButtonsPart';
import Line from './components/Line';
import ResultScreen from './components/ResultScreen';
import Screen from './components/Screen';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <Screen>
        <ResultScreen />
        <ButtonsPart />
        <Line />
      </Screen>
    </div>
  );
}

export default App;
