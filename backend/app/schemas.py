from pydantic import BaseModel


class ShoppingSession(BaseModel):

    Administrative: int
    Administrative_Duration: float

    Informational: int
    Informational_Duration: float

    ProductRelated: int
    ProductRelated_Duration: float

    BounceRates: float
    ExitRates: float
    PageValues: float
    SpecialDay: float

    Month: str

    OperatingSystems: int
    Browser: int
    Region: int
    TrafficType: int

    VisitorType: str

    Weekend: bool