from rest_framework import serializers
from .models import Picture
from accounts.serializers import UserSerializer
from market_map.serializers import MarketSerializer

class PictureSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    market = MarketSerializer(required=False)
    class Meta:
        model = Picture
        fields = ['picture', 'kind', 'grade', 'longtitude', 'latitude']