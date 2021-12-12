# from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from group_buying.serializers import ArticleSerializer
from .models import Market
from group_buying.models import Article
from .serializers import MarketAllSerializer, MarketSerializer
# from market_map import serializers


@api_view(['GET'])
def market_all(request):
    markets = Market.objects.all()
    serializer = MarketAllSerializer(markets, many=True)  # context 느낌
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def market_detail(request, market_pk):
    market = Market.objects.get(pk=market_pk)
    serializer = MarketSerializer(market)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def market_article_list(request, market_pk):
    market = get_object_or_404(Market,pk=market_pk)
    articles = Article.objects.filter(market=market)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)