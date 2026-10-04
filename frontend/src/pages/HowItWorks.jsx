import React from "react";
import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <main className="page">
      <section className="page-header">
        <div>
          <div className="hero-badge">WORKFLOW</div>
          <h1>How BuySense Works</h1>
          <p>A simple explanation of the machine learning prediction process.</p>
        </div>
      </section>

      <section className="how-grid">
        <div className="step-card">
          <div className="step-number">01</div>
          <h2>Enter Visitor Information</h2>
          <p>
            Provide the shopper's browsing behaviour and session details using
            the prediction form. This includes page visits, durations, and
            technical details.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">02</div>
          <h2>Automatic Feature Engineering</h2>
          <p>
            BuySense automatically calculates required engineered features
            (like Total Pages and Avg Duration Per Page) in the background. You
            don't need to calculate these manually.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">03</div>
          <h2>Machine Learning Prediction</h2>
          <p>
            The trained Random Forest model processes the complete feature set
            and analyses the patterns to generate an accurate purchase
            intention prediction.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">04</div>
          <h2>Purchase Probability</h2>
          <p>
            The system displays the final prediction (Purchase Likely or No
            Purchase Likely) along with a percentage probability to help you
            interpret the model's confidence.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HowItWorks;
