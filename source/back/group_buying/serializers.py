from rest_framework import serializers
from .models import Article, Comment
from accounts.serializers import UserSerializer
from market_map.serializers import MarketSerializer


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        field = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    market = MarketSerializer(read_only=True)
    # comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Article
        fields = '__all__'

class ArticleListSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    market = MarketSerializer(read_only=True)
    class Meta:
        model = Article
        fields = ('id', 'title', 'for_selling', 'price', 'article_kind', 'meeting_time', 'market', 'user')
        read_only_fields = ('market', 'user')