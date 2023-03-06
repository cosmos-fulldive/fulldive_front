import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home.jsx'

function App() {
  return (
    <>

      <BrowserRouter>



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
