from django.shortcuts import render
from django.http import HttpResponse
from ScrapBackend import db
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import requests
import os
mycol = db.mydb["test"]

@api_view(['POST'])
def scrap(request):
    companyName = request.data.get('companyname')
    scrapname = request.data.get('scrap')
    if companyName:
        try:
            if scrapname == 'ambitionbox':
                url = f"http://localhost:3001/ambition/excel?companyName={companyName}"
            elif scrapname == "google":
                url = f"http://localhost:3001/google/excel?companyName={companyName}"
            else:
                return Response({'error': f"Unable to fetch scrap name. Status code: {response.status_code}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            response = requests.get(url)
            if response.status_code == 200:
                file_path = os.path.join("./scrapping/Excels", f"{companyName}_{scrapname}-overalldata.xlsx")
                
                with open(file_path, 'wb') as file:
                    file.write(response.content)

                return Response({'message': f'Excel file saved at {file_path}'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': f"Unable to fetch data from the server. Status code: {response.status_code}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except requests.exceptions.RequestException as e:
            return Response(f"An error occurred while fetching data from the server: {str(e)}")
    else:
        return Response({'error': 'Input Required'}, status=status.HTTP_400_BAD_REQUEST)
