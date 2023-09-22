import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import MyNavBar from './components/MyNavBar';
import GIFConverter from "./routes/GifConverter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyNavBar />
        <Router>
          <Routes>
            <Route path="/gifconverter" element={<GIFConverter />}>
            </Route>
          </Routes>
          <Routes>
            <Route path="/tab2" element={<h1>tab2</h1>}>
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
