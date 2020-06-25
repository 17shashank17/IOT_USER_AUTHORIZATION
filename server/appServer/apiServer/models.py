from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserDetail(models.Model):

    user = models.ForeignKey(User,on_delete = models.CASCADE)
    firstname = models.CharField(default="", max_length = 50)
    lastname = models.CharField(default="", max_length = 50)
    email = models.CharField(default= "", max_length = 50)
    base64image = models.CharField(default='',max_length = 5000000000)

    def __str__(self):

        return self.user.username 

class SubjectAttendence(models.Model):

    user_relation = models.ForeignKey(User,on_delete = models.CASCADE)
    subject_name = models.CharField(default='',max_length = 50)
    no_of_classes_taken = models.IntegerField(default = 0)
    no_of_classes_attended = models.IntegerField(default = 0)

    def __str__(self):

        return self.user_relation.username+' '+self.subject_name

# class SubjectAttendence(models.Model):

#     user_relation = models.ForeignKey(User,on_delete = models.CASCADE)
#     subject_relation = models.ForeignKey(Subject,on_delete = models.CASCADE)

#     no_of_classes_taken = models.IntegerField(default = 0)
#     no_of_classes_attended = models.IntegerField(default = 0)

#     def __str__(self):

#         return self.user_relation.username+' '+self.subject_relation.subject_name

    
