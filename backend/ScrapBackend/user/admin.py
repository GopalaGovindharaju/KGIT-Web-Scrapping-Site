from django.contrib import admin
from .models import SignUpTable

class SignUpTableAdmin(admin.ModelAdmin):
    list_display = ('Email', 'User_Name', 'Password', 'is_active',)

admin.site.register(SignUpTable, SignUpTableAdmin)
