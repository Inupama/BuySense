from pydantic import BaseModel, Field


class PredictionInput(BaseModel):
    Administrative: int = Field(ge=0)
    Administrative_Duration: float = Field(ge=0)

    Informational: int = Field(ge=0)
    Informational_Duration: float = Field(ge=0)

    ProductRelated: int = Field(ge=0)
    ProductRelated_Duration: float = Field(ge=0)

    BounceRates: float = Field(ge=0, le=1)
    ExitRates: float = Field(ge=0, le=1)

    PageValues: float = Field(ge=0)
    SpecialDay: float = Field(ge=0, le=1)

    Month: str
    OperatingSystems: int = Field(ge=1, le=8)
    Browser: int = Field(ge=1, le=13)
    Region: int = Field(ge=1, le=9)
    TrafficType: int = Field(ge=1, le=20)

    VisitorType: str

    Weekend: bool


class PredictionResponse(BaseModel):
    prediction: int
    probability: float
