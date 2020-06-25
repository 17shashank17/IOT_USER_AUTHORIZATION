from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^register',views.register),
    url(r'^login',views.loginUser),
    url(r'^logout',views.logoutUser),
    url(r'^addsubject',views.addSubject),
    url(r'^getsubject',views.getSubject),
    url(r'^updateattendence',views.updateAttendence),
]