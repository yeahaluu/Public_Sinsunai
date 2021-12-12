from rest_framework_jwt.views import obtain_jwt_token
from django.urls import path
# from django.conf.urls import url

from . import views


app_name = 'users'

urlpatterns = [
    path('signup/', views.signup),
    path('profile/', views.profile),
    path('profile/articles/', views.profile_article_list),
    # path('profile/<int:user_id>/', views.profile_update, name='profile_update')  # 수정하려면 그냥profile에서 put으로?
]
