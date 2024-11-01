from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
import pandas as pd
import os

app = FastAPI()

# file_name = "C:/Users/ACER/OneDrive - ESMT/Bureau/Autodidacte/JYENDataGenerator/AdventureWorksDW.csv"
@app.get("/")
def read_root():
    return {"Hello": "World"}

file_name = "./AdventureWorksDW.csv"
@app.get("/csv/{file_name}")
def read_csv():
    if os.path.exists(file_name):
        return FileResponse(file_name, media_type='text/csv')
    else:
        return {"error": "Fichier non trouvé"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8001)