# from django.shortcuts import redirect

# from django.contrib.auth import login as auth_login
# from django.contrib.auth import logout as auth_logout
# from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from group_buying.serializers import ArticleSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer, ProfileSerializer
from django.contrib.auth import get_user_model

# from .serializers import *
from .models import *
# from accounts import serializers



User = get_user_model()

@api_view(['GET', 'POST'])
def signup(request):

    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# @login_required
@api_view(['GET', 'PUT'])
def profile(request):
    my_user = request.user
    if request.method == 'GET':
        data = {
            "username" : my_user.username,
            "seller" : my_user.seller, 
            "market" : my_user.market, 
            # "article_list" : my_articles_serializer, 
            }
        return Response(data)
    elif request.method == 'PUT':
        serializer = ProfileSerializer(instance=my_user, data=request.data)
        market = get_object_or_404(Market, id=request.data['market_id'])
        if serializer.is_valid(raise_exception=True):
            serializer.save(market=market)
            return Response(serializer.data)


def profile_article_list(request):
    my_user = request.user
    my_articles = Article.objects.filter(user=my_user)
    serializer = ArticleSerializer(my_articles, many=True)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)

# @api_view(['PUT'])
# def profile_update(request,user_id):
#     my_user = request.user
#     serializer = UserSerializer(instance=my_user, data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data)