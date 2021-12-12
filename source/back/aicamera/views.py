<<<<<<< HEAD
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Picture
from .serializers import PictureSerializer


@api_view(['POST'])
def picture_upload(request, picture_pk):
    picture = get_object_or_404(Picture, pk=picture_pk)
    serializer = PictureSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(picture=picture)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def picture_detail(request, picture_pk):
    picture = Picture.objects.get(pk=picture_pk)
    serializer = PictureSerializer(picture)
    return Response(serializer.data, status=status.HTTP_200_OK)
=======
from django.shortcuts import render

# Create your views here.
>>>>>>> 3da3acb3abc917c18aa1d2b95cb021a076c0968b
