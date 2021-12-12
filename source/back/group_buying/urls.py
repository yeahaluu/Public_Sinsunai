from django.urls import path
from . import views

app_name = 'article'

urlpatterns = [
    # GET/POST => /api/articles/
    path('', views.article_list_or_create),
    # GET/PUT/DELETE => /api/articles/1/
    path('<int:article_pk>/', views.article_detail_or_update_or_delete),
    # POST => /api/articles/<pk>/comments/  =>  댓글 생성
    path('<int:article_pk>/comments/', views.create_comment),
    # PUT/DELETE => /api/articles/<pk>/comments/<pk>/  => 단일 댓글 수정/삭제
    path('<int:article_pk>/comments/<int:comment_pk>/', views.update_or_delete_comment),
]