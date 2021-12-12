from django.urls import path
from . import views

app_name = 'aicamera'

urlpatterns = [
    path('', views.picture_upload),
    path('/<int:picture_pk>', views.picture_detail),
]
