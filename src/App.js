import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import MyNavBar from './components/MyNavBar';
import GIFConverter from "./routes/GifConverter";
import Watermark from "./routes/Watermark";
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>블록툴툴</title>
      </Helmet>
      <header className="App-header">
        <MyNavBar/>
        {/* <Router basename="/"> */}
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route path="/" element={<GIFConverter />}>
              </Route>
            </Routes>
            <Routes>
              <Route path="/gifconverter/" element={<GIFConverter />}>
              </Route>
            </Routes>
            <Routes>
              <Route path="/watermark/" element={<Watermark />}>
              </Route>
            </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
