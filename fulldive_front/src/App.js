import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import styled from "styled-components";
import MainTop from "./components/MainTop.jsx";
import MainLeft from "./components/MainLeft.jsx";
import NotFound from "./404.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store/ConfigStore";
import { GlobalStyles } from "./components/styles/GlobalStyles";

const persistor = persistStore(store);

function App() {
  return (
    <>
      {/* <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>FullDive</title>
      </head> */}
      <BrowserRouter>
        <div className="App-content">
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <MainTop />
              {/* <MainLeft /> */}
              <Wrap>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/*" element={<NotFound />} />
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
