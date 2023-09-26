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
  return (
    <div className="App">
      <header className="App-header">
        <MyNavBar/>
        <Router>
            <Routes>
              <Route path={process.env.PUBLIC_URL + "/"} element={<GIFConverter />}>
              </Route>
            </Routes>
            <Routes>
              <Route path={process.env.PUBLIC_URL + "/gifconverter"} element={<GIFConverter />}>
              </Route>
            </Routes>
            <Routes>
              <Route path={process.env.PUBLIC_URL + "/tab2"} element={<h1>tab2</h1>}>
              </Route>
            </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
