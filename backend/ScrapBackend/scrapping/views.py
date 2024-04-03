from django.shortcuts import render
from django.http import HttpResponse
from ScrapBackend import db
from django.views.decorators.csrf import csrf_exempt
mycol = db.mydb["test"]

@csrf_exempt
def home(request):
    output = mycol.insert_one({
        "titles" : "post"
    })
    return HttpResponse("done")
