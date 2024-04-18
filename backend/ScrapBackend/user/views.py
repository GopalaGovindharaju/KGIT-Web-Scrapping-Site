from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from .models import SignUpTable
from django.core.mail import send_mail


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
        # Generate verification token
        verification_token = f"{email}-{username}"
        
        # Send verification email
        verification_link = f"http://localhost:3000/verify_email/{verification_token}/{username}"  # Replace with your actual domain
        message = f"Hello {username},\n\nPlease click the following link to verify your email: {verification_link}"
        send_mail(
            'Email Verification',
            message,
            'gopala200218@gmail.com',
            [email],
            fail_silently=False,
        )

        return Response({'message': 'Check mail to activate account'}, status=status.HTTP_201_CREATED)
    
@api_view(['POST'])
def verify_email(request):
    token = request.data.get('token')
    if token:
        try:
            parts = token.split('-')
            print(parts[0])
            user = SignUpTable.objects.get(Email=parts[0])
            user.is_active = True
            user.save()
            return Response({'message': 'Email verified successfully. You can now login.'}, status=status.HTTP_200_OK)
        except SignUpTable.DoesNotExist:
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Token not provided'}, status=status.HTTP_400_BAD_REQUEST)

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
                data = {
                    'username': user.User_Name,
                    'email': user.Email,
                }
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'User Not Found SignUp First'}, status=status.HTTP_401_UNAUTHORIZED)

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

