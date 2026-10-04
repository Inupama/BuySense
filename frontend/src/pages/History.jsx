import React, { useEffect, useState } from "react";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const savedHistory =
      JSON.parse(localStorage.getItem("buysenseHistory")) || [];

    setHistory(savedHistory);

  }, []);


  const clearHistory = () => {

    localStorage.removeItem("buysenseHistory");

    setHistory([]);

  };


  return (
    <main className="page">

      <section className="page-header">

        <div>
          <div className="hero-badge">
            PREDICTION HISTORY
          </div>

          <h1>Prediction History</h1>

          <p>
            Review predictions made using BuySense.
          </p>
        </div>

      </section>


      <section className="history-section">

        {history.length === 0 ? (

          <div className="empty-history">

            <div className="empty-icon">📋</div>

            <h2>No Predictions Yet</h2>

            <p>
              Your completed predictions will appear here.
            </p>

          </div>

        ) : (

          <>

            <div className="history-header">

              <h2>Previous Predictions</h2>

              <button
                className="clear-history-button"
                onClick={clearHistory}
              >
                Clear History
              </button>

            </div>


            <div className="history-list">

              {history.map((item, index) => (

                <div className="history-card" key={index}>

                  <div>

                    <span className="history-date">
                      {item.date}
                    </span>

                    <h3>
                      {item.prediction === 1
                        ? "Purchase Likely"
                        : "No Purchase Likely"}
                    </h3>

                  </div>


                  <div className="history-probability">

                    <span>
                      Probability
                    </span>

                    <strong>
                      {(item.probability * 100).toFixed(2)}%
                    </strong>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}

      </section>

    </main>
  );
}

export default History;