import numpy as np
import pandas as pd 
import matplotlib
import seaborn as sns
import sklearn

import matplotlib.pyplot as plt 
from sklearn.preprocessing import StandardScaler
from sklearn import tree
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split
import pandas as pd
from .utils import plotting
from .utils import pie
from .utils import hist

data = pd.read_csv('./data/hmnist_28_28_RGB.csv')

print("DtAT : ",data.head())
print(data.info())
print("COLS : ",data.columns)
print(data.isnull().any().sum())
y = data['label']
x = data.drop(columns = ['label'])
M_DATA = pd.read_csv('./data/HAM10000_metadata.csv')
M_DATA.head()

plotting(_,M_DATA)


 