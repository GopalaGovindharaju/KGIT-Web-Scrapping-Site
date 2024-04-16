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
        username = data.get('username')
        password = data.get('password')

        # Check if user already exists
        if SignUpTable.objects.filter(Email=email).exists():
            return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Create new user
        user = SignUpTable.objects.create(Email=email, User_Name=username)
        user.set_password(password)
        user.save()

        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def verify_user(request):
    if request.method == 'POST':
        data = request.data

        email = data.get('email')
        password = data.get('password')

        # Authenticate user
        if SignUpTable.objects.filter(Email=email).exists():
            user = SignUpTable.objects.get(Email=email)
            # Check authentication result
            if user is not None and user.check_password(password):
                # Login user
                print('user is validated')
                return Response({'message': user.User_Name}, status=status.HTTP_200_OK)
            else:
                return Response("incorrect password")
        else:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def google_user(request):
    if request.method == 'POST':
        data = request.data

        username = data.get('username')
        email = data.get('email')
        
        
        if SignUpTable.objects.filter(Email=email).exists():
            return Response({'message': "User Found"}, status=status.HTTP_200_OK)
        else:
            user = SignUpTable(Email=email,User_Name=username)
            user.save()
            return Response({'message': "User Created"}, status=status.HTTP_200_OK)

    else:
        return Response({'error': 'Invalid request'}, status=status.HTTP_401_UNAUTHORIZED)

