import React from "react";

function About() {
  return (
    <main className="page">

      <section className="page-header">

        <div>

          <div className="hero-badge">
            ABOUT BUY SENSE
          </div>

          <h1>About the System</h1>

          <p>
            Understanding online shopper purchase intention through
            machine learning.
          </p>

        </div>

      </section>


      <section className="about-grid">

        <div className="about-card">

          <h2>What is BuySense?</h2>

          <p>
            BuySense is a machine-learning based decision support system
            designed to predict whether an online shopping session is likely
            to result in a purchase.
          </p>

          <p>
            The system uses information about the shopper's browsing
            behaviour and session characteristics to generate a prediction
            and an associated purchase probability.
          </p>

        </div>


        <div className="about-card">

          <h2>Machine Learning Model</h2>

          <p>
            BuySense uses a trained Random Forest classification model.
            The model processes the information submitted through the
            prediction form and produces the final prediction.
          </p>

        </div>


        <div className="about-card">

          <h2>Feature Engineering</h2>

          <p>
            BuySense automatically calculates additional features required
            by the machine-learning model.
          </p>

          <ul>

            <li>Total Pages</li>

            <li>Total Duration</li>

            <li>Average Duration Per Page</li>

            <li>Product Page Share</li>

            <li>Product Duration Share</li>

          </ul>

        </div>


        <div className="about-card">

          <h2>Prediction Output</h2>

          <p>
            The system provides two main outputs:
          </p>

          <ul>

            <li>Predicted purchase outcome</li>

            <li>Purchase probability</li>

          </ul>

          <p>
            These results can help users understand the likelihood of a
            shopper completing a purchase.
          </p>

        </div>

      </section>

    </main>
  );
}

export default About;