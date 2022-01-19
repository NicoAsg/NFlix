from driver import Scraper
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import JavascriptException

import undetected_chromedriver as uc

from _thread import *
import signal, sys
from time import sleep
from random import randint, seed

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.encoders import jsonable_encoder

from scrap.Anime import Anime
from scrap.Movie import Movie
from scrap.Serie import Serie

# Run with:
# uvicorn api:app --reload --host=137.74.197.63


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

class Receive(BaseModel):
    type: str
    title: str
    season: str = "0"
    episode: str = "0" 

@app.post("/test/")
async def test(rcv: Receive, request: Request):
    content = { "type": rcv.type, "title": rcv.title }
    headers = { 'Access-Control-Allow-Origin': '*' }
    return JSONResponse(content=content, headers=headers)

@app.post("/video/")
async def video(rcv: Receive, request: Request):
    if rcv.type == "Anime":
        content = new_connection(Anime(rcv.title, rcv.season, rcv.episode).commands(), "")
    elif rcv.type == "Serie":
        content = new_connection(Serie(rcv.title, rcv.season, rcv.episode).commands(), "")
    elif rcv.type == "Movie":
        print(Movie(rcv.title).commands())
        content = new_connection(Movie(rcv.title).commands(), "")
    else:
        content = { "error": "wrong type" }
    headers = { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        }
    return JSONResponse(content=content, headers=headers)

@app.get("/video/TVSeries/Anime/{title}/{season}/{episode}/")
async def serie_anime(title: str, season: str, episode: str, request: Request):
    content = new_connection(Anime(title, season, episode).commands(), request.client.host)
    headers = { 'Access-Control-Allow-Origin': '*' }
    return JSONResponse(content=content, headers=headers)

@app.get("/video/TVSeries/Serie/{title}/{season}/{episode}/")
async def serie(title: str, season: str, episode: str, request: Request):
    content = new_connection(Serie(title, season, episode).commands(), request.client.host)
    headers = { 'Access-Control-Allow-Origin': '*' }
    return JSONResponse(content=content, headers=headers)

@app.get("/video/Movie/Animation/{title}/")
async def movie_anime(title: str, request: Request):
    content = new_connection(Anime(title).commands(), request.client.host)
    headers = { 'Access-Control-Allow-Origin': '*' }
    return JSONResponse(content=content, headers=headers)

@app.get("/video/Movie/Movie/{title}/")
async def movie(title: str, request: Request):
    content = new_connection(Movie(title).commands(), request.client.host)
    headers = { 'Access-Control-Allow-Origin': '*' }
    return JSONResponse(content=content, headers=headers)


seed(1)     # Seed for random

##  Global variables
global drivers      # List of Chrome instance for each connection
drivers = list()


###     Deals with a new connection
def new_connection(commands: list[str], client: str):
    reply = "" # Create reply

    driver = findDriver(client) 
    if driver == None:      # Create a driver if none exists
        uc_options = uc.ChromeOptions()
        uc_options.add_argument("--start-maximized")
        uc_options.add_argument("--disable-popup-blocking")
        driver = Scraper(uc.Chrome(options=uc_options), client)
        drivers.append(driver)
    
    reply = run_cmds(driver, commands)

    driver.quit()
    drivers.remove(driver)

    return { "video": reply }   # Send the reply

def run_cmds(driver, cmds):
    reply = ""
    for command in cmds:        # For each command
        try:
            print("Command: ", command)
            
            # Run the command
            cmd_return = str(eval(command))
            if(cmd_return != "None"):
                reply += cmd_return
                print(reply)
            print("Returns: " + cmd_return)

            sleep(0.000177 * randint(1000, 10000))
        except NameError as err:
            print(str(err))
            break
    
    return reply

###### TODO: Handle those exception when eval():

# exception selenium.common.exceptions.UnableToSetCookieException(msg=None, screen=None, stacktrace=None)
# Bases: selenium.common.exceptions.WebDriverException

# Thrown when a driver fails to set a cookie.

######

# exception selenium.common.exceptions.JavascriptException(msg=None, screen=None, stacktrace=None)
# Bases: selenium.common.exceptions.WebDriverException

# An error occurred while executing JavaScript supplied by the user.

###### End

def findDriver(client) -> Scraper:
    if "drivers" not in globals():
        global drivers
        drivers = list()
        return None
    else:
        for driver in drivers:
            if driver.client == client:
                return driver
    
    return None