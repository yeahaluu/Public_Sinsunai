from django.db import models
# from group_buying.models import Article

class Market(models.Model):
    name = models.CharField(max_length=50)
    address = models.TextField()
    longitude = models.DecimalField(max_digits=12, decimal_places=8)
    latitude = models.DecimalField(max_digits=12, decimal_places=8)
    category = models.CharField(max_length=50)
    score = models.DecimalField(max_digits=12, decimal_places=8,null=True)  # 마켓 사진을 통해 등급 평균?

    def __str__(self):
        return f'{self.id} => {self.name}'