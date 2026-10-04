import { useState } from "react";
import axios from "axios";
import "../App.css";

const API_URL = "http://localhost:8000";

const initialForm = {
  Administrative: 0,
  Administrative_Duration: 0,
  Informational: 0,
  Informational_Duration: 0,
  ProductRelated: 0,
  ProductRelated_Duration: 0,
  BounceRates: 0,
  ExitRates: 0,
  PageValues: 0,
  SpecialDay: 0,
  Month: "Feb",
  OperatingSystems: 1,
  Browser: 1,
  Region: 1,
  TrafficType: 1,
  VisitorType: "Returning_Visitor",
  Weekend: false,
};

function Predict(){
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/predict`, form);

      setResult(response.data);
    } catch (err) {
      console.error(err);

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError(
          "Unable to connect to the BuySense API. Please make sure the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setError("");
  };

  const handleNewPrediction = () => {
    setResult(null);
    setError("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const probability = result
    ? (result.probability * 100).toFixed(1)
    : 0;

  const purchaseLikely = result?.prediction === 1;

  const totalPages =
    Number(form.Administrative || 0) +
    Number(form.Informational || 0) +
    Number(form.ProductRelated || 0);

  const totalDuration =
    Number(form.Administrative_Duration || 0) +
    Number(form.Informational_Duration || 0) +
    Number(form.ProductRelated_Duration || 0);

  const avgDurationPerPage = totalPages === 0 ? 0 : totalDuration / totalPages;

  const productPageShare = totalPages === 0 ? 0 : Number(form.ProductRelated || 0) / totalPages;

  const productDurationShare = totalDuration === 0 ? 0 : Number(form.ProductRelated_Duration || 0) / totalDuration;

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="brand-icon">B</div>

          <div>
            <h1>BuySense</h1>
            <p>Online Shopper Purchase Intention Prediction</p>
          </div>
        </div>
      </header>

      <main className="container">

        {/* Introduction */}
        <section className="intro">
          <div className="intro-badge">
            AI-POWERED PREDICTION
          </div>

          <h2>Predict Customer Purchase Intention</h2>

          <p>
            Enter the customer's online browsing behaviour and session
            information below. BuySense will analyse the information
            using a trained machine learning model and estimate the
            likelihood of a purchase.
          </p>
        </section>

        {/* Prediction Form */}
        <form className="prediction-form" onSubmit={handleSubmit}>

          {/* 1. Visitor & Session Information */}
          <section className="form-section">
            <div className="section-title">
              <span className="section-number">01</span>
              <div>
                <h3>Visitor & Session Information</h3>
                <p>General session timing and details.</p>
              </div>
            </div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="Month">Month</label>
                <select id="Month" name="Month" value={form.Month} onChange={handleChange}>
                  <option value="Feb">February</option>
                  <option value="Mar">March</option>
                  <option value="May">May</option>
                  <option value="Oct">October</option>
                  <option value="June">June</option>
                  <option value="Jul">July</option>
                  <option value="Aug">August</option>
                  <option value="Nov">November</option>
                  <option value="Sep">September</option>
                  <option value="Dec">December</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="SpecialDay">Special Day</label>
                <input id="SpecialDay" name="SpecialDay" type="number" min="0" max="1" step="0.01" value={form.SpecialDay} onChange={handleChange} required />
                <span className="field-help">Proximity to a special day (0 to 1)</span>
              </div>
            </div>
            <div className="weekend-row">
              <label className="toggle-container">
                <input type="checkbox" name="Weekend" checked={form.Weekend} onChange={handleChange} />
                <span className="toggle"></span>
                <span>
                  <strong>Weekend Visit</strong>
                  <small>Select if the session occurred during a weekend.</small>
                </span>
              </label>
            </div>
          </section>

          {/* 2. Page Activity */}
          <section className="form-section">
            <div className="section-title">
              <span className="section-number">02</span>
              <div>
                <h3>Page Activity</h3>
                <p>Counts of different page types visited.</p>
              </div>
            </div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="Administrative">Administrative Pages</label>
                <input id="Administrative" name="Administrative" type="number" min="0" value={form.Administrative} onChange={handleChange} required />
                <span className="field-help">Number of administrative pages</span>
              </div>
              <div className="field">
                <label htmlFor="Informational">Informational Pages</label>
                <input id="Informational" name="Informational" type="number" min="0" value={form.Informational} onChange={handleChange} required />
                <span className="field-help">Number of informational pages</span>
              </div>
              <div className="field">
                <label htmlFor="ProductRelated">Product-Related Pages</label>
                <input id="ProductRelated" name="ProductRelated" type="number" min="0" value={form.ProductRelated} onChange={handleChange} required />
                <span className="field-help">Number of product pages</span>
              </div>
            </div>
          </section>

          {/* 3. Duration & Engagement */}
          <section className="form-section">
            <div className="section-title">
              <span className="section-number">03</span>
              <div>
                <h3>Duration & Engagement</h3>
                <p>Time spent and engagement metrics.</p>
              </div>
            </div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="Administrative_Duration">Administrative Duration</label>
                <input id="Administrative_Duration" name="Administrative_Duration" type="number" min="0" step="0.01" value={form.Administrative_Duration} onChange={handleChange} required />
                <span className="field-help">Time on admin pages</span>
              </div>
              <div className="field">
                <label htmlFor="Informational_Duration">Informational Duration</label>
                <input id="Informational_Duration" name="Informational_Duration" type="number" min="0" step="0.01" value={form.Informational_Duration} onChange={handleChange} required />
                <span className="field-help">Time on info pages</span>
              </div>
              <div className="field">
                <label htmlFor="ProductRelated_Duration">Product Duration</label>
                <input id="ProductRelated_Duration" name="ProductRelated_Duration" type="number" min="0" step="0.01" value={form.ProductRelated_Duration} onChange={handleChange} required />
                <span className="field-help">Time on product pages</span>
              </div>
              <div className="field">
                <label htmlFor="BounceRates">Bounce Rate</label>
                <input id="BounceRates" name="BounceRates" type="number" min="0" max="1" step="0.0001" value={form.BounceRates} onChange={handleChange} required />
                <span className="field-help">Value between 0 and 1</span>
              </div>
              <div className="field">
                <label htmlFor="ExitRates">Exit Rate</label>
                <input id="ExitRates" name="ExitRates" type="number" min="0" max="1" step="0.0001" value={form.ExitRates} onChange={handleChange} required />
                <span className="field-help">Value between 0 and 1</span>
              </div>
              <div className="field">
                <label htmlFor="PageValues">Page Value</label>
                <input id="PageValues" name="PageValues" type="number" min="0" step="0.01" value={form.PageValues} onChange={handleChange} required />
                <span className="field-help">Average page value</span>
              </div>
            </div>
          </section>

          {/* 4. Traffic & Technical Information */}
          <section className="form-section">
            <div className="section-title">
              <span className="section-number">04</span>
              <div>
                <h3>Traffic & Technical Information</h3>
                <p>System and location characteristics.</p>
              </div>
            </div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="OperatingSystems">Operating System</label>
                <select id="OperatingSystems" name="OperatingSystems" value={form.OperatingSystems} onChange={handleChange}>
                  {Array.from({ length: 8 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Operating System {i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="Browser">Browser</label>
                <select id="Browser" name="Browser" value={form.Browser} onChange={handleChange}>
                  {Array.from({ length: 13 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Browser {i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="Region">Region</label>
                <select id="Region" name="Region" value={form.Region} onChange={handleChange}>
                  {Array.from({ length: 9 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Region {i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="TrafficType">Traffic Type</label>
                <select id="TrafficType" name="TrafficType" value={form.TrafficType} onChange={handleChange}>
                  {Array.from({ length: 20 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Traffic Type {i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* 5. Visitor Information */}
          <section className="form-section">
            <div className="section-title">
              <span className="section-number">05</span>
              <div>
                <h3>Visitor Information</h3>
                <p>Technical and visitor characteristics.</p>
              </div>
            </div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="VisitorType">Visitor Type</label>
                <select id="VisitorType" name="VisitorType" value={form.VisitorType} onChange={handleChange}>
                  <option value="Returning_Visitor">Returning Visitor</option>
                  <option value="New_Visitor">New Visitor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Automatic Feature Engineering */}
          <section className="form-section feature-engineering-section">
            <div className="section-title">
              <span className="section-number">⚙</span>
              <div>
                <h3>Automatic Feature Engineering</h3>
                <p>These features are automatically calculated from the information entered above.</p>
              </div>
            </div>
            <div className="fe-grid">
              <div className="fe-card">
                <span className="fe-label">Total Pages</span>
                <strong className="fe-value">{totalPages}</strong>
              </div>
              <div className="fe-card">
                <span className="fe-label">Total Duration</span>
                <strong className="fe-value">{totalDuration.toFixed(2)}</strong>
              </div>
              <div className="fe-card">
                <span className="fe-label">Avg Duration/Page</span>
                <strong className="fe-value">{avgDurationPerPage.toFixed(2)}</strong>
              </div>
              <div className="fe-card">
                <span className="fe-label">Product Page Share</span>
                <strong className="fe-value">{(productPageShare * 100).toFixed(2)}%</strong>
              </div>
              <div className="fe-card">
                <span className="fe-label">Product Duration Share</span>
                <strong className="fe-value">{(productDurationShare * 100).toFixed(2)}%</strong>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="button-row">

            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>

            <button
              type="submit"
              className="predict-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analysing...
                </>
              ) : (
                <>
                  Predict Purchase Intention
                  <span className="arrow">→</span>
                </>
              )}
            </button>

          </div>

        </form>

        {/* Error */}
        {error && (
          <div className="error-box">
            <strong>Prediction Error</strong>
            <p>{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <section className="result-card">

            <div className="result-header">
              <div>
                <span className="result-tag">
                  MODEL PREDICTION
                </span>

                <h2>Prediction Result</h2>
              </div>

              <div className="result-status">
                {purchaseLikely ? "✓" : "!"}
              </div>
            </div>

            <div
              className={
                purchaseLikely
                  ? "prediction-box purchase"
                  : "prediction-box no-purchase"
              }
            >

              <div className="prediction-main">

                <span className="result-label">
                  Prediction
                </span>

                <h3>
                  {purchaseLikely
                    ? "Purchase Likely"
                    : "No Purchase Likely"}
                </h3>

                <p>
                  {purchaseLikely
                    ? "Based on the provided browsing behaviour, the model predicts that this visitor is likely to make a purchase."
                    : "Based on the provided browsing behaviour, the model predicts that this visitor is unlikely to make a purchase."}
                </p>

              </div>

              <div className="probability-circle">
                <strong>{probability}%</strong>
                <span>Probability</span>
              </div>

            </div>

            {/* Progress */}
            <div className="probability-section">

              <div className="probability-header">
                <span>Purchase Probability</span>
                <strong>{probability}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className={
                    purchaseLikely
                      ? "progress-bar-fill purchase-fill"
                      : "progress-bar-fill no-purchase-fill"
                  }
                  style={{
                    width: `${probability}%`,
                  }}
                ></div>
              </div>

            </div>

            {/* Interpretation */}
            <div className="interpretation">

              <div className="interpretation-icon">
                💡
              </div>

              <div>
                <strong>Interpretation</strong>

                <p>
                  A purchase probability of{" "}
                  <strong>{probability}%</strong> indicates the
                  model's estimated likelihood that the visitor will
                  generate revenue through a purchase during the session.
                </p>
              </div>

            </div>

            <button
              className="new-prediction-btn"
              onClick={handleNewPrediction}
            >
              + New Prediction
            </button>

          </section>
        )}

      </main>

      <footer>
        <p>
          BuySense &nbsp;•&nbsp; Machine Learning Purchase Intention
          Prediction System
        </p>
      </footer>

    </div>
  );
}


export default Predict;