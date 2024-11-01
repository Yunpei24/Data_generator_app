import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
from app.utils.ip_address import ip_address

from app.routers import jyApi as api

app = FastAPI()
app.include_router(api.router)

# Get the absolute path of the static directory using the script's current directory
static_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app/static")

app.mount("/static", StaticFiles(directory=static_directory), name="app/static")

# Get the absolute path of the templates directory using the script's current directory
templates_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app/templates")
templates = Jinja2Templates(directory=templates_directory)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/generator", response_class=HTMLResponse)
async def generator(request: Request):
    return templates.TemplateResponse("generator.html", {"request": request})

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8001)
