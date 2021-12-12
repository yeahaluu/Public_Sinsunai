from django.db import models
<<<<<<< HEAD
from django.conf import settings
from django.db.models.fields import related
from market_map.models import Market


class Picture(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    market = models.ForeignKey(Market, on_delete=models.CASCADE)  #좌표가 정확하지 않을때는 가장 근처의 마켓을 저장
    picture = models.ImageField()
    create_at = models.DateTimeField(auto_now_add=True)
    kind = models.CharField(max_length=30)
    grade = models.IntegerField()
    latitude = models.DecimalField(max_digits=12, decimal_places=8)
    longitude = models.DecimalField(max_digits=12, decimal_places=8)

    def str(self):
        return f'{self.id} = {self.kind}'
=======

# Create your models here.
>>>>>>> 3da3acb3abc917c18aa1d2b95cb021a076c0968b
