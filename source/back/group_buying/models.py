from django.db import models
from django.conf import settings
from django.db.models.fields import related
from market_map.models import Market


class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    market = models.ForeignKey(Market, on_delete=models.CASCADE,null=True)
    title = models.CharField(max_length=50)
    article_kind = models.CharField(max_length=20)
    price = models.IntegerField(null=True)
    personnel = models.IntegerField()
    meeting_time = models.DateTimeField()
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    body = models.TextField()
    article_picture = models.ImageField(null=True)
    for_selling = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.id} => {self.title}'

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content