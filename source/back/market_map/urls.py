from django.urls import path
from . import views

app_name = 'market_map'

urlpatterns = [
    path('', views.market_all, name='market_all'),
    path('<int:market_pk>/', views.market_detail, name='market_detail'),
    path('<int:market_pk>/articles', views.market_article_list),
]
