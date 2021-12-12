from rest_framework import serializers
from .models import Market
# from aicamera.serializers import PictureSerializer



class MarketAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = ('name', 'category', 'longitude', 'latitude')


class MarketSerializer(serializers.ModelSerializer):
#     pictures = PictureSerializer(many=True, read_only=True)

#     score = serializers.DecimalField(source='pictures.grade.average')
    class Meta:
        model = Market
        fields = ['name', 'category', 'longitude', 'latitude', 'score']
