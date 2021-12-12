# 다운받은 이미지파일들 압축 풀기
# 데이터 용량이 너무 커서 한번에 알집 못풀어서 하나하나 풀고 지워주고 해야됨
# Usage
# $ python unzip_all.py --data [data-file-loc]
# ex)  $ python unzip_all.py --data C:/Users/multicampus/projects/fresh/data

# 폴더 구조
# data
#   Training
#   Validation

import zipfile
import os
from glob import glob
from tqdm import tqdm
import argparse


def call(command):
    """
    윈도우랑 리눅스 경로 명령어 다른 문제 때문에
    """
    result = os.system(command)
    if result:  # error
        command = command.replace('/', '\\')
        result = os.system(command)
        if result:
            command = command.replace('\\', '/')
            result = os.system(command)
    return result


def unzip_folder(zip_files):
    zip_files = [x for x in zip_files if x.endswith('.zip')]
    for zf in tqdm(zip_files):
        new_data_loc = zf[:-4]  # remove '.zip'
        call(f'mkdir {new_data_loc}')
        with zipfile.ZipFile(zf, 'r') as zip_ref:
            zip_ref.extractall(new_data_loc)
        call(f'rm {zf}')


parser = argparse.ArgumentParser()
parser.add_argument('--data', help='')
args = parser.parse_args()
data_loc = args.data
valid_folder = glob(f'{data_loc}/Validation/*')
train_folder = glob(f'{data_loc}/Training/*')
print('-----valid folder unzip')
unzip_folder(valid_folder)
print('-----train folder unzip')
unzip_folder(train_folder)
