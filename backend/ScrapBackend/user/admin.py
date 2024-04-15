from django.contrib import admin
from .models import SignUpTable

class SignUpTableAdmin(admin.ModelAdmin):
    list_display = ('Email', 'CompanyName')

admin.site.register(SignUpTable, SignUpTableAdmin)
