from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from .models import SignUpTable

@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        data = request.data

        email = data.get('email')
        companyname = data.get('companyname')
        password = data.get('password')
        confirm_password = data.get('confirmpassword')

        if password != confirm_password:
            return Response({'error': 'Password and confirm password do not match'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user already exists
        if SignUpTable.objects.filter(Email=email).exists():
            return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Create new user
        user = SignUpTable.objects.create(Email=email, CompanyName=companyname)
        user.set_password(password)
        user.save()

        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def verify_user(request):
    if request.method == 'POST':
        data = request.data

        email = data.get('email')
        password = data.get('password')
        print(email)
        print(password)

        # Authenticate user
        user = authenticate( request, username= email, password= password)
        print(user)

        # Check authentication result
        if user is not None:
            # Login user
            print('user is validated')
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)