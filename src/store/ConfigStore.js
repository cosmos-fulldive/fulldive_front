import { persistReducer } from "redux-persist";
import { authReducer } from "./_redcuers/authReducer";
import { createStore, combineReducers } from "redux";
// local storage 사용
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  //local storage에 저장
  storage: storage,
};

const allReducers = combineReducers({
  Auth: authReducer,
});

const store = createStore(
  persistReducer(persistConfig, allReducers),
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
