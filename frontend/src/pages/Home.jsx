import React from "react";
import { Link } from "react-router-dom";

const highlights = [
  {
    icon: "activity",
    title: "Behaviour Analysis",
    description: "Analyses shopper browsing and session information.",
  },
  {
    icon: "model",
    title: "Machine Learning",
    description: "Uses a trained Random Forest classification model.",
  },
  {
    icon: "target",
    title: "Purchase Prediction",
    description: "Provides a predicted purchase outcome and probability.",
  },
];

function HighlightIcon({ kind }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: "false",
  };

  if (kind === "activity") {
    return <svg {...common}><path d="M3 12h4l2.2-6 4.2 12 2.2-6H21" /></svg>;
  }
  if (kind === "model") {
    return <svg {...common}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4M10 10h4v4h-4z" /></svg>;
  }
  return <svg {...common}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><path d="m13.5 10.5 6-6M16 4.5h3.5V8" /></svg>;
}

function Home() {
  return (
    <main className="page home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Understand Your Customer&apos;s <span>Purchase Intention</span>
          </h1>
          <p>
            BuySense uses machine learning to predict whether an online shopper
            is likely to complete a purchase based on their browsing behaviour.
          </p>
          <div className="hero-buttons">
            <Link to="/predict" className="primary-button">
              Start Prediction
            </Link>
            <Link to="/how-it-works" className="secondary-button">
              How It Works
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div
            className="dashboard-visual"
            role="img"
            aria-label="Illustrative session analysis dashboard"
          >
            <div className="visual-topline">
              <span>SESSION ANALYSIS</span>
              <span className="visual-live"><i /> READY</span>
            </div>

            <div className="visual-chart" aria-hidden="true">
              {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
            </div>
            <div className="visual-bottom">
              <span><b className="visual-dot" />Browsing signals</span>
              <strong>Model prediction</strong>
            </div>
            
          </div>
        </div>
      </section>

      <section className="home-intro">
        <div className="home-intro-copy">
          <h2>What is BuySense?</h2>
          <p>
            BuySense is a machine-learning based decision-support system that
            estimates whether an online shopping session is likely to result in
            a purchase.
          </p>
        </div>
        <div className="home-highlights">
          {highlights.map((item) => (
            <article className="home-highlight" key={item.title}>
              <span className="home-highlight-icon"><HighlightIcon kind={item.icon} /></span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-concept" aria-label="BuySense concept">
        <p>From shopper behaviour to purchase intention.</p>
        <div className="concept-flow">
          <span>Shopper Behaviour</span>
          <b aria-hidden="true">&rarr;</b>
          <span>Analysis</span>
          <b aria-hidden="true">&rarr;</b>
          <span>Purchase Intention</span>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="cta-eyebrow">EXPLORE BUYSENSE</span>
          <h2>Ready to analyse a shopper session?</h2>
          <p>Enter session information and let BuySense estimate purchase intention.</p>
        </div>
        <div className="home-cta-actions">
          <Link to="/predict" className="cta-button">
            Start Prediction <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link to="/how-it-works" className="cta-secondary">
            Learn How It Works
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
