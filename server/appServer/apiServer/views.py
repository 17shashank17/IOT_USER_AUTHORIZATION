from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserDetail, SubjectAttendence
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.core import serializers
from django.core.files.images import ImageFile
import json
import base64


@csrf_exempt
def register(request):

    if request.method == "POST":
        # print(request.body)

        content = json.loads(request.body)

        array_content = content['_parts']

        username = array_content[0][1]
        password = array_content[1][1]
        firstname = array_content[3][1]
        lastname = array_content[4][1]
        email = array_content[5][1]
        photo_info = array_content[7][1]
        base64content = array_content[8][1]

        # print(array_content)
        # print("Photo",photo_info)
        # print('base64',base64content)

        img_content = base64.b64decode(base64content)


        try:
            user_obj = User.objects.get(username = username)
            print("try",user_obj)
            return JsonResponse({'message':False})
        
        except:
            user_obj = User()
            user_obj.username = username
            user_obj.set_password(password)
            user_obj.save()

            # photo = ImageFile(photo_info)
            # print("Photo Details",photo)
            with open('media/images/'+username+'.jpg','wb') as fd:
                fd.write(img_content)
            user_details = UserDetail(user=user_obj,firstname=firstname,lastname = lastname,email = email,base64image = base64content)
            user_details.save()

            user_details = UserDetail.objects.filter(user=user_obj)

            user_detail = serializers.serialize('json',user_details)

            user = authenticate(username = username,password = password)

            if user:
                login(request,user)

            return JsonResponse({'message': True,'username':username,'user_detail':user_detail})


    return HttpResponse("Registration")

@csrf_exempt
def loginUser(request):

    if request.method=='POST':

        content = json.loads(request.body)
        # print(content)
        # print(content['username'])
        try:
            user_obj = User.objects.get(username = content['username'])

            user = authenticate(username=content['username'],password=content['password'])

            if user:

                login(request,user)

                user_detail = UserDetail.objects.filter(user = user)

                user_detail = serializers.serialize('json',user_detail)

                return JsonResponse({'message':True,'username':user_obj.username,'user_detail':user_detail})

            else:

                return JsonResponse({'message':False})

        except:

            return JsonResponse({'message':False})

@csrf_exempt
def logoutUser(request):

    logout(request)

    return JsonResponse({'message':'Logged Out Successfully'})

@csrf_exempt
def addSubject(request):

    print(request.body)
    content = json.loads(request.body)

    print(content)
    print(content['subjects'])
    print(request.user)

    for subject in content['subjects']:
        attendence_info = SubjectAttendence(user_relation = request.user,subject_name = subject)
        attendence_info.save()


    return JsonResponse({'message':'All Subjects Registered'})

def getSubject(request):

    subjects = SubjectAttendence.objects.filter(user_relation=request.user)

    subjects_detail = serializers.serialize('json',subjects)

    return JsonResponse({'subjects_detail':subjects_detail})

@csrf_exempt
def updateAttendence(request):

    content = json.loads(request.body)

    subject = SubjectAttendence.objects.get(user_relation=request.user, subject_name = content['subject_name'])

    subject.no_of_classes_taken = content['no_of_classes_taken']
    subject.no_of_classes_attended = content['no_of_classes_attended']
    subject.save()
    
    return JsonResponse({'message':'Attendence Updated'})