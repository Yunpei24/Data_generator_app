from fastapi import APIRouter, Response
from fastapi.responses import FileResponse
from app.utils import myFonctions as mf
import app.models.models as md
import os

router = APIRouter()

class Token:
    def __init__(self, token: int):
        self.token = token
    
    def get_token(self):
        return self.token
    
    def set_token(self, token: int):
        self.token = token

token = Token(0)


@router.post('/api/data')
async def get_data(data: md.DataRequest):

    if data.boolSQL == "true":
        # Générer les données pour le fichier SQL
        one = mf.creer_fichier_sql(data.tableName, data.columnName, data.sqlType, data.numberOfRows, data.columnType)
        token.set_token(1)
    elif data.boolSQL == "false":
        # Générer les données pour le fichier CSV
        one = mf.insert_into_csv_by_pandas(data.columnType, data.columnName, data.numberOfRows)
        token.set_token(0)

    # retourner un message en fonction de la réussite ou non de la génération; en une seule ligne
    return {'message': 'Data generated successfully'} if one == 1 else {'message': 'Data generation failed'}



"""@router.get('/download/')
def download_file(): 
    
    if token.get_token() == 1:
        filename_sql = './app/db/data_generated.sql'
        # Vérifier que le fichier existe
        if not os.path.isfile(filename_sql):
            return {'message': 'File not found'}
        
        return FileResponse(filename_sql, media_type='text/sql')
    
    elif token.get_token() == 0:
        filename_csv = './app/db/data_generated.csv'
        # Vérifier que le fichier existe
        if not os.path.isfile(filename_csv):
            return {'message': 'File not found'}
        
        # Envoyer le fichier CSV dans la réponse
        return FileResponse(filename_csv, media_type='text/csv')"""


@router.get('/download/')
def download_file(response: Response): 
    if token.get_token() == 1:
        filename_sql = './app/db/data_generated.sql'
        if not os.path.isfile(filename_sql):
            return {'message': 'File not found'}
        
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        return FileResponse(filename_sql, media_type='text/sql')
    
    elif token.get_token() == 0:
        filename_csv = './app/db/data_generated.csv'
        if not os.path.isfile(filename_csv):
            return {'message': 'File not found'}
        
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        return FileResponse(filename_csv, media_type='text/csv')
