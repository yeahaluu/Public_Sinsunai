# 농산물 이미지 분류

## 개요

- [농산물 품질 이미지](https://aihub.or.kr/aidata/30726) 데이터를 이용해 사과, 배, 감 등 10가지 농산물의 품질(3단계) 분류 모델 생성
- CNN 기반 모델



## ./Models

`my_model_all` : 54개(상품 종류 + 등급) 모델 판별 한번에, no softmax

`my_model_all_2` : 위의 모델에서 epoch를 5 -> 10으로 증가시킨 모델, 성능은 그리 좋지않음

`my_model_kind_1108` : 상품 종류(18개)만 판별하는 모델, softmax O

`my_model_kind_1109` : 상품 종류(18개)만 판별하는 모델, 학습시 scaling 적용(각각 픽셀값을 0~255 -> 0~1), softmax O

`mobile_net_1111.h5` : 상품종류만 판별, no scaling, img size : 224x224

## Files

`unzip_all.py`

```shell
# Usage
$ python unzip_all.py --data [data-file-loc]
```

- 다운받은 데이터가 알집형태로 되어있어 압축을 자동으로 풀어주는 파일
- 이미지데이터 용량이 커서 한번에 압축풀면 하드디스크 용량 문제가 발생해 개별 알집파일의 압축을 풀고, 알집파일을 삭제하는 과정을 자동화



`set_data_folder_structure.py`

```shell
# Usage
$ python set_data_folder_structure.py --data [data-file-loc]
```

- Keras의 preprocess API를 사용하기 위해 폴더구조를 적절히 변경

- ex) apple_fuji_L, apple_fuji_M, apple_fuji_S 3개의 폴더를 apple_fuji 라는 상위폴더안으로 이동



`modeling.ipynb`

- CNN기반 이미지 분류 모델
- 1개의 농산물(후지사과 등)을 학습하는데 20분정도 소요(gpu 환경에서)
- 이미지의 크기가 1000x1000으로 다소 크기때문에 Pooling을 통해 이미지의 크기를 반씩 줄여나가 학습할 parameter의 수를 많이 줄여줘야됨

![img](https://blog.kakaocdn.net/dn/oWHJ2/btqCIE7YOuS/DHB8ZU0pWwEjPEHJHRhWp1/img.png)



## To do

- [ ] Front-end로 어떻게 모델을 전달할지 

- [ ] VGG, GoogLeNet 등 여러 pretrained 모델 공부, 적용해보기
- [ ] Image data augmentation을 통해 모델 성능 향상