import joblib
import pandas as pd
import numpy as np
from pathlib import Path


MODEL_PATH = (
    Path(__file__).resolve().parent.parent
    / "models"
    / "buysense_rf_pipeline.joblib"
)


model = joblib.load(MODEL_PATH)


def add_engineered_features(data):
    """
    Apply the same feature engineering used during model training.
    """

    data = data.copy()

    data["TotalPages"] = (
        data["Administrative"]
        + data["Informational"]
        + data["ProductRelated"]
    )

    data["TotalDuration"] = (
        data["Administrative_Duration"]
        + data["Informational_Duration"]
        + data["ProductRelated_Duration"]
    )

    data["AvgDurationPerPage"] = np.where(
        data["TotalPages"] > 0,
        data["TotalDuration"] / data["TotalPages"],
        0
    )

    data["ProductPageShare"] = np.where(
        data["TotalPages"] > 0,
        data["ProductRelated"] / data["TotalPages"],
        0
    )

    data["ProductDurationShare"] = np.where(
        data["TotalDuration"] > 0,
        data["ProductRelated_Duration"] / data["TotalDuration"],
        0
    )

    return data


print("BuySense Random Forest model loaded successfully.")