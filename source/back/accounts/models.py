from django.db import models
from django.contrib.auth.models import AbstractUser
from market_map.models import Market
from group_buying.models import Article

# kakao API 적용 안함. 해주세요
class User(AbstractUser):
    email = models.EmailField()
    profileImg = models.ImageField(null=True)
    nickname = models.CharField(max_length=20)
    seller = models.BooleanField(default=False, null=True)
    market = models.ForeignKey(Market, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'User Class - {self.id}: {self.nickname}'
