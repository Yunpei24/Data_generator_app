from pydantic import BaseModel

class DataRequest(BaseModel):
    columnType: list
    numberOfRows: int
    columnName: list
    tableName: str
    sqlType: list
    boolSQL: str