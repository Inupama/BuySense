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
    <nav className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="brand">
          <div className="brand-icon">B</div>
          <div>
            <div className="brand-name">BuySense</div>
            <div className="brand-subtitle">Purchase Intention Prediction</div>
          </div>
        </Link>

        <div className="nav-links">
          <Link
            to="/"
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

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="brand-icon" style={{ width: '36px', height: '36px', fontSize: '18px' }}>B</div>
              <div>
                <strong>BuySense</strong>
                <p>Machine Learning Decision Support System</p>
              </div>
            </div>

            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/predict">Predict</Link>
              <Link to="/how-it-works">How It Works</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>Online Shopper Purchase Intention Prediction System. FDM Project.</p>
          </div>
        </footer>

      </div>

    </BrowserRouter>
  );
}

export default App;