echo "hello"
cd /home/ubuntu/app/backend
pwd
# Dockerfile을 기반으로 도커 이미지를 생성하도록 한다.
docker build -t sinsunai/backend:latest .
# 이미 실행중이던 컨테이너를 종료시킨다.
docker container stop sinsunai
# 그리고 해당 컨테이너를 삭제했다.
docker rm sinsunai
# EC2의 8000번 포트와 컨테이너의 8000번 포트를 연결하고 
# sinsunai/backend라는 이미지를 sinsunai 라는 이름의 컨테이너를 백그라운드로 실행시킨다.
docker run -d --name sinsunai -p 8000:8000 sinsunai/backend