import './App.css';

import D3Line from './D3Charts/D3Line';
import D3Scatter from './D3Charts/D3Scatter';

function App() {
  return (
    <div className="App">
    <D3Scatter/> 
    <br /> <br />
    <br /> <br />
    <D3Line/>
    </div>
  );
}

export default App;