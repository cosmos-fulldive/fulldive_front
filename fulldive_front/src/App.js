import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import styled from "styled-components";
import MainTop from "./components/MainTop.jsx";
import MainLeft from "./components/MainLeft.jsx";
import Stage from "./pages/stage/Stage";
import NotFound from "./404.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store/ConfigStore";
import { GlobalStyles } from "./components/styles/GlobalStyles";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup.jsx";
import Type from "./pages/signup/type/type";
import LiveStage from "./pages/stage/LiveStage.jsx";
import UpcomingStage from "./pages/stage/UpcomingStage.jsx";
import ExitStage from "./pages/stage/ExitStage.jsx";
import Artist from "./pages/artist/Artist.jsx";

const persistor = persistStore(store);

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App-content">
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <MainTop />
              <MainLeft />
              <Wrap>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/stage" element={<Stage />} />
                  <Route path="/stage/liveStage" element={<LiveStage />} />
                  <Route path="/stage/upcomingStage" element={<UpcomingStage />} />
                  <Route path="/stage/exitStage" element={<ExitStage />} />
                  <Route path="/artist" element={<Artist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signup/type" element={<Type />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Wrap>
            </PersistGate>
          </Provider>
          <GlobalStyles />
        </div>
      </BrowserRouter>
    </>
  );
}

const Wrap = styled.div`
  display: flex;
  min-width: 100%;
  height: 100%;
  padding-top: 100px;
`;

export default App;
