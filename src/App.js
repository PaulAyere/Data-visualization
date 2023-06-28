import './App.css';
import D3Line from './D3Line';
import D3Scatter from './D3Scatter';
import CurveChart from './CurveChart';

function App() {
  return (
    <div className="App">
    <D3Scatter/> 
    <br /> <br />
    <br /> <br />
    <D3Line/>
    <CurveChart/>
    </div>
  );
}

export default App;