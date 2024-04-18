from django.urls import path
from . import views

urlpatterns = [
  
    path('signup/', views.create_user, name='create_user'), 
    path('login/', views.verify_user, name='verify_user'), 
    path('google/', views.google_user, name='google_user'), 
    path('emailVerify/', views.verify_email, name='verify_email'), 

]