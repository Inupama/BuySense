import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Predict from "./pages/Predict";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";

import "./App.css";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-inner">

        <Link to="/" className="brand">
          <div className="brand-icon">B</div>
          <div>
            <div className="brand-name">BuySense</div>
            <div className="brand-subtitle">Machine Learning Decision Support System</div>
          </div>
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            aria-current={location.pathname === "/" ? "page" : undefined}
            className={location.pathname === "/" ? "nav-link active" : "nav-link"}
          >
            Home
          </Link>

          <Link
            to="/predict"
            className={
              location.pathname === "/predict"
                ? "nav-link active"
                : "nav-link"
            }
            aria-current={location.pathname === "/predict" ? "page" : undefined}
          >
            Predict
          </Link>

          <Link
            to="/how-it-works"
            className={
              location.pathname === "/how-it-works"
                ? "nav-link active"
                : "nav-link"
            }
            aria-current={location.pathname === "/how-it-works" ? "page" : undefined}
          >
            How It Works
          </Link>

          <Link
            to="/about"
            className={
              location.pathname === "/about"
                ? "nav-link active"
                : "nav-link"
            }
            aria-current={location.pathname === "/about" ? "page" : undefined}
          >
            About
          </Link>
        </div>

      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Navigation />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/predict" element={<Predict />} />

          <Route path="/how-it-works" element={<HowItWorks />} />

          <Route path="/about" element={<About />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;
