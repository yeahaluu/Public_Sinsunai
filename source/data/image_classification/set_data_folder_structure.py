#!/usr/bin/env python
# coding: utf-8

# # 데이터 폴더 구조 세팅
# Keras의 preprcess API를 이용해 데이터를 불러들이기 때문에 데이터 폴더 구조를 이에 맞게 변경해야함

# Usage
# $ python set_data_folder_structure.py --data [data-file-loc]
# ex)  $ python set_data_folder_structure.py --data C:/Users/multicampus/projects/fresh/data/Training

# 폴더 구조
# data
#   Training
#   Validation

from glob import glob
from tqdm import tqdm
import os
import argparse


def mv_folders(fn):
    os.system(f'mkdir {fn}')
    for g in ['L', 'M', 'S']:
        os.system(f'mv {fn}_{g} {fn}')


parser = argparse.ArgumentParser()
parser.add_argument('--data', help='')
args = parser.parse_args()
data_loc = args.data

os.chdir(data_loc)
folder_names = [x for x in glob('*') if not x.startswith('[라벨]')]
check = [x for x in folder_names if x.endswith('L')]
folder_names = list(set(['_'.join(x.split('_')[:-1]) for x in folder_names]))

if not len(check):  # 이미 구조가 변경된 상태
    print('Training : 변경할 폴더가 없습니다.')
else:
    for fn in tqdm(folder_names):
        mv_folders(fn)
