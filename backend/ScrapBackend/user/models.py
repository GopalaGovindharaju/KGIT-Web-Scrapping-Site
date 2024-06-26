from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class SignUpTable(models.Model):
    Email = models.EmailField(primary_key=True, max_length=254, unique=True)
    User_Name = models.CharField(max_length=100)
    Password = models.CharField(max_length=128, null=True)
    is_active = models.BooleanField(default=False)
    

    def __str__(self):
        return self.Email

    def set_password(self, raw_password):
        self.Password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.Password)
