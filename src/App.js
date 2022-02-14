import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Checkout from "./pages/Checkout/Checkout";
import Alert from "./components/Alert/Alert";
import Home from "./pages/Home/Home";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Alert />
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
