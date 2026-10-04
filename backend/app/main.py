import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import ShoppingSession
from .model import model, add_engineered_features


app = FastAPI(
    title="BuySense API",
    description="Online Shopping Purchase Prediction API",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "BuySense API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "Random Forest"
    }


@app.post("/predict")
def predict(session: ShoppingSession):

    input_data = pd.DataFrame([session.model_dump()])

    input_data = add_engineered_features(input_data)

    prediction = int(model.predict(input_data)[0])

    probability = float(
        model.predict_proba(input_data)[0][1]
    )

    if prediction == 1:
        result = "Purchase"
        message = "The customer is likely to make a purchase."
    else:
        result = "No Purchase"
        message = "The customer is unlikely to make a purchase."

    return {
        "prediction": prediction,
        "result": result,
        "purchase_probability": round(probability, 4),
        "message": message
    }