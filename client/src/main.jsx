import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Provider } from "react-redux";
// import store from "./store/ReduxStore";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { reduccers } from "./reduccer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reduccers, composeEnhancers(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
