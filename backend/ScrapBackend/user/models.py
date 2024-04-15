from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class SignUpTable(models.Model):
    Email = models.EmailField(primary_key=True, max_length=254, unique=True)
    CompanyName = models.CharField(max_length=100)
    Password = models.CharField(max_length=128)
    ConfirmPassword = models.CharField(max_length=128)

    def __str__(self):
        return self.Email

    def set_password(self, raw_password):
        self.Password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.Password)
