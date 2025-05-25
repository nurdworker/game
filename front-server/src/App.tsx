// public modules
import React from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { store } from "./store";

// custom
import { useFuncs } from "./funcs";

// css
import "./App.scss";

// types
import { ReduxState } from "./types/index";
import ErrorBoundary from "./components/ErrorBoundary";
import TestZone from "./components/TestZone";

// icons

// components
import Home from "./components/Home";

const AppContent = () => {
  // default
  const isDev = process.env.REACT_APP_ENV === "dev";
  const location = useLocation();
  const dispatch = useDispatch();

  // redux store
  const reduxTestData = useSelector((state: ReduxState) => state.data.testData);

  // mode state
  // public data
  // component state
  // funcs
  return (
    <div className="App">
      <div className="container_app">
        <p>hello from app</p>
        <p>{reduxTestData}</p>
        <div className="router_screen">
          <ErrorBoundary>
            <Routes>
              <Route path="/home" element={<Home />} />
            </Routes>
          </ErrorBoundary>
          {isDev && <TestZone />}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router future={{ v7_startTransition: false }}>
        <AppContent />
      </Router>
    </Provider>
  );
}
export default App;
