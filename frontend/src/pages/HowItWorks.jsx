import React from "react";

function HowItWorks() {
  return (
    <main className="page">
      <section className="page-header">
        <div>
          <div className="hero-badge">WORKFLOW</div>
          <h1>How BuySense Works</h1>
          <p>Follow a session from visitor input through automatic preparation to its purchase outcome and probability.</p>
        </div>
      </section>

      <section className="how-grid" aria-label="BuySense prediction workflow">
        <div className="step-card">
          <div className="step-number">01</div>
          <h2>Enter Visitor Information</h2>
          <p>
            Provide browsing behaviour and session details, including page visits, durations and technical information.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">02</div>
          <h2>Automatic Feature Engineering</h2>
          <p>
            BuySense calculates the required features from the entered values. There is no need to calculate them manually.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">03</div>
          <h2>Machine Learning Prediction</h2>
          <p>
            The trained Random Forest classification model processes the session information to produce a purchase intention prediction.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">04</div>
          <h2>Purchase Probability</h2>
          <p>
            The system displays the final prediction (Purchase Likely or No
            Purchase Likely) along with a percentage probability to help you
            interpret the model's estimated purchase likelihood.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HowItWorks;
