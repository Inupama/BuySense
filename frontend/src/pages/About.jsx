import React from "react";
import { Link } from "react-router-dom";

const pipeline = [
  {
    number: "01",
    mark: "01",
    title: "Visitor Behaviour",
    description: "Browsing activity and session information are provided as model inputs.",
  },
  {
    number: "02",
    mark: "FE",
    title: "Feature Engineering",
    description: "Derived session features are calculated automatically before prediction.",
  },
  {
    number: "03",
    mark: "RF",
    title: "Random Forest Model",
    description: "The trained classifier processes the prepared visitor/session information.",
  },
  {
    number: "04",
    mark: "%",
    title: "Purchase Probability",
    description: "The system presents an outcome alongside the estimated probability.",
  },
];

const engineeredFeatures = [
  "Total Pages",
  "Total Duration",
  "Average Duration Per Page",
  "Product Page Share",
  "Product Duration Share",
];

function About() {
  return (
    <main className="page about-page">
      <section className="page-header about-header">
        <div className="hero-badge">ABOUT BUYSENSE</div>
        <h1>Understand shopper intent through session data.</h1>
      </section>

      <section className="about-overview">
        <div className="about-overview-mark" aria-hidden="true">B</div>
        <div>
          <span className="section-eyebrow">THE SYSTEM</span>
          <h2>What is BuySense?</h2>
          <p>
            BuySense analyses online shopper browsing behaviour with a trained
            machine-learning model to predict whether a session is likely to
            result in a purchase. It provides a purchase outcome and probability
            to support interpretation of that prediction.
          </p>
        </div>
        <div className="overview-points" aria-label="System capabilities">
          <span>Browsing behaviour</span>
          <span>Machine learning</span>
          <span>Purchase intention</span>
          <span>Probability output</span>
        </div>
      </section>

      <section className="about-model">
        <div className="model-symbol" aria-hidden="true">RF</div>
        <div>
          <span className="section-eyebrow">CLASSIFICATION MODEL</span>
          <h2>Random Forest Classification</h2>
          <p>
            The trained Random Forest model processes the prepared visitor and
            session information to predict whether the session is likely to
            result in a purchase. BuySense presents that prediction with its
            purchase probability.
          </p>
        </div>
        <div className="model-type">Trained model<br /><strong>Purchase intention</strong></div>
      </section>

      <section className="about-features">
        <div className="about-section-heading align-left">
          <span className="section-eyebrow">MODEL PREPARATION</span>
          <h2>Automatic feature engineering</h2>
          <p>These features are calculated automatically from the visitor's session information before the model makes its prediction.</p>
        </div>
        <ul className="engineered-feature-list">
          {engineeredFeatures.map((feature, index) => (
            <li className="engineered-feature" key={feature}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <strong>{feature}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-output-section">
        <div className="about-section-heading align-left">
          <span className="section-eyebrow">READING THE RESULT</span>
          <h2>Prediction output</h2>
          <p>Each prediction communicates two related pieces of information.</p>
        </div>
        <div className="output-explainer">
          <article className="output-item">
            <span className="output-icon outcome-icon" aria-hidden="true">✓</span>
            <div>
              <span className="output-label">OUTCOME</span>
              <h3>Predicted Purchase Outcome</h3>
              <p>Indicates whether the model predicts a purchase for the session.</p>
              <span className="example-outcome">Purchase Likely / No Purchase Likely</span>
            </div>
          </article>
          <article className="output-item">
            <span className="output-icon probability-icon" aria-hidden="true">%</span>
            <div>
              <span className="output-label">PROBABILITY</span>
              <h3>Purchase Probability</h3>
              <p>The model's estimated probability that the session results in a purchase.</p>
              <div className="example-meter" role="img" aria-label="Illustrative probability meter; no prediction value shown">
                <span />
              </div>
              <small className="meter-caption">Displayed from the returned prediction</small>
            </div>
          </article>
        </div>
      </section>

      <section className="about-pipeline-section">
        <div className="about-section-heading">
          <span className="section-eyebrow">FROM SESSION TO OUTPUT</span>
          <h2>The BuySense pipeline</h2>
          <p>Four stages connect visitor information to an interpretable result.</p>
        </div>
        <ol className="about-pipeline">
          {pipeline.map((step) => (
            <li className="pipeline-step" key={step.number}>
              <span className="pipeline-mark" aria-hidden="true">{step.mark}</span>
              <span className="pipeline-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-cta">
        <div>
          <span className="section-eyebrow">PUT THE WORKFLOW TO USE</span>
          <h2>Ready to analyse a shopper session?</h2>
          <p>Enter session information to get a purchase intention prediction.</p>
        </div>
        <Link to="/predict" className="primary-button">Start Prediction <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}

export default About;
