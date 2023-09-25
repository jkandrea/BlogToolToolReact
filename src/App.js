import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import './App.css';
import MyNavBar from './components/MyNavBar';
import GIFConverter from "./routes/GifConverter";

function App() {
  console.log(process.env.PUBLIC_URL)
  return (
    <div className="App">
      <header className="App-header">
        <MyNavBar/>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Router>
            <Routes>
              <Route path="/" element={<GIFConverter />}>
              </Route>
            </Routes>
            <Routes>
              <Route path="/gifconverter" element={<GIFConverter />}>
              </Route>
            </Routes>
            <Routes>
              <Route path="/tab2" element={<h1>tab2</h1>}>
              </Route>
            </Routes>
          </Router>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
