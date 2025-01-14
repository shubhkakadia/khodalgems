import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./components/state/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";


ReactDOM.render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>,

  document.getElementById("root")
);
