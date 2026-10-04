from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .schemas import PredictionInput, PredictionResponse


# ---------------------------------------------------------
# Application
# ---------------------------------------------------------

app = FastAPI(
    title="BuySense API",
    description="Online Shopper Purchase Intention Prediction API",
    version="1.0.0",
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# Load model
# ---------------------------------------------------------

MODEL_PATH = (
    Path(__file__).resolve().parent.parent
    / "models"
    / "buysense_rf_pipeline.joblib"
)

model = joblib.load(MODEL_PATH)


# ---------------------------------------------------------
# Health check
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "BuySense API is running",
        "status": "OK",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
    }


# ---------------------------------------------------------
# Prediction
# ---------------------------------------------------------

@app.post("/predict", response_model=PredictionResponse)
def predict(data: PredictionInput):

    try:
        # Convert request data into dictionary
        input_data = data.model_dump()

        # -------------------------------------------------
        # Feature Engineering
        # -------------------------------------------------

        total_pages = (
            input_data["Administrative"]
            + input_data["Informational"]
            + input_data["ProductRelated"]
        )

        total_duration = (
            input_data["Administrative_Duration"]
            + input_data["Informational_Duration"]
            + input_data["ProductRelated_Duration"]
        )

        if total_pages > 0:
            avg_duration_per_page = total_duration / total_pages
            product_page_share = (
                input_data["ProductRelated"] / total_pages
            )
        else:
            avg_duration_per_page = 0.0
            product_page_share = 0.0

        if total_duration > 0:
            product_duration_share = (
                input_data["ProductRelated_Duration"] / total_duration
            )
        else:
            product_duration_share = 0.0

        # -------------------------------------------------
        # Add engineered features
        # -------------------------------------------------

        input_data["TotalPages"] = total_pages
        input_data["TotalDuration"] = total_duration
        input_data["AvgDurationPerPage"] = avg_duration_per_page
        input_data["ProductPageShare"] = product_page_share
        input_data["ProductDurationShare"] = product_duration_share

        # -------------------------------------------------
        # Create DataFrame
        # -------------------------------------------------

        df = pd.DataFrame([input_data])

        # -------------------------------------------------
        # Model prediction
        # -------------------------------------------------

        prediction = int(model.predict(df)[0])

        probabilities = model.predict_proba(df)[0]

        probability = float(probabilities[1])

        # -------------------------------------------------
        # Response
        # -------------------------------------------------

        return PredictionResponse(
            prediction=prediction,
            probability=probability,
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}",
        )
