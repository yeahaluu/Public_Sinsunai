from market_map.serializers import MarketSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
# from group_buying.serializers import ArticleSerializer
# from django.contrib.auth import authenticate

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # write_only : 시리얼라이징은 하지만 응답에는 포함시키지 않음
    # article = ArticleSerializer(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'username', 'seller', 'market']

class ProfileSerializer(serializers.ModelSerializer):
    market = MarketSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['seller', 'market']