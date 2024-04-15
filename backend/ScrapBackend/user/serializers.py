from rest_framework import serializers
from .models import SignUpTable

class SignUpTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUpTable
        fields = ('Email', 'CompanyName')
