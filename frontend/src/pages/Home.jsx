import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page">

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            MACHINE LEARNING SYSTEM
          </div>

          <h1>
            Understand Your Customer's
            <span> Purchase Intention</span>
          </h1>

          <p>
            BuySense uses machine learning to predict whether an online
            shopper is likely to complete a purchase based on their browsing
            behaviour.
          </p>

          <div className="hero-buttons">

            <Link to="/predict" className="primary-button">
              Start Prediction →
            </Link>

            <Link to="/about" className="secondary-button">
              Learn More
            </Link>

          </div>

        </div>

      </section>


      <section className="feature-section">

        <div className="section-heading">
          <h2>What BuySense Does</h2>
          <p>
            A data-driven approach to understanding online shopping behaviour.
          </p>
        </div>


        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">📊</div>

            <h3>Behaviour Analysis</h3>

            <p>
              Analyses browsing activity such as page visits, duration,
              bounce rates and exit rates.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">🤖</div>

            <h3>Machine Learning</h3>

            <p>
              Uses a trained Random Forest model to estimate purchase
              intention.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">📈</div>

            <h3>Probability</h3>

            <p>
              Provides a purchase probability to help interpret the model's
              prediction.
            </p>
          </div>

        </div>

      </section>


      <section className="how-section">

        <div className="section-heading">
          <h2>How It Works</h2>
        </div>

        <div className="steps-grid">

          <div className="step">
            <div className="step-number">01</div>
            <h3>Enter Data</h3>
            <p>
              Provide the shopper's browsing behaviour and session details.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Analyse</h3>
            <p>
              BuySense calculates the required engineered features
              automatically.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Predict</h3>
            <p>
              The Random Forest model analyses the prepared data.
            </p>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Interpret</h3>
            <p>
              View the predicted purchase outcome and probability.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;