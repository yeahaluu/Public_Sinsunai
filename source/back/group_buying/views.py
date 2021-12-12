from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from .models import Article, Comment, Market
from .serializers import ArticleSerializer, ArticleListSerializer, CommentSerializer


@api_view(['GET', 'POST'])
def article_list_or_create(request):

    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        user = request.user
        print('request.data;', request.data)
        market = get_object_or_404(Market, id=request.data['market_id']) 
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user, market=market)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def article_detail_or_update_or_delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)

    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ArticleSerializer(data=request.data, instance=article)
        if serializer.is_valid(raise_exception=True):
            serializer.save(article=article)
            return Response(serializer.data)

    elif request.method == 'DELETE':
        write_user = Article.objects.filter(id=article.pk)
        my_user =User.objects.filter(username=request.data["UserName"])
        if str(my_user[0]) == str(write_user[0].username):
            article.delete()
            data = { 
                'success': True,
                'message': f'게시글이 삭제되었습니다.',
            }
            return Response(data=data, status=status.HTTP_204_NO_CONTENT)
        else:
            data = {
                'success' : False,
                'message' : '게시글 삭제에 실패했습니다. 사용자의 게시글인지 확인해주세요.'
            }
            return Response(data)


@api_view(['POST'])
def create_comment(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
def update_or_delete_comment(request, article_pk, comment_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)

    if request.method == 'PUT':
        serializer = CommentSerializer(instance=comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(article=article)
            return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        comment.delete()
        data = {  # cutomize message
            'success': True,
            'message': f'댓글이 삭제되었습니다.',
        }
        return Response(data=data, status=status.HTTP_204_NO_CONTENT)
