import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home.jsx'
import MainTop from './components/MainTop.jsx'
import MainLeft from './components/MainLeft.jsx'

function App() {
  return (
    <>

      <BrowserRouter>
        {/* <MainTop /> */}
        {/* <MainLeft /> */}
        <div className="App-content">

          <Routes>
            <Route path="/" element={<Home />} />

          </Routes>

        </div>

      </BrowserRouter>



    </>
  );
}

export default App;
