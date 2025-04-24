import numpy as np
import pandas as pd 
import matplotlib
import seaborn as sns
import sklearn

import matplotlib.pyplot as plt

def plotting(x,DATA):
    sns.countplot(x = 'dx', data = DATA)
    plt.xlabel('Disease', size=12)
    plt.ylabel('Frequency', size=12)
    plt.title('Frequency Distribution of Classes', size=16)


def pie(x,DATA):
    B, ax = plt.subplots(figsize = (10,10))
    plt.pie(tabular_data['sex'].value_counts(), labels = DATA['sex'].value_counts().index, autopct="%.1f%%")
    plt.title('Gender of Patient', size=16)
    
    
    
def hist(x,DATA):
    bar, ax = plt.subplots(figsize=(10,10))
    sns.histplot(DATA['age'])
    plt.title('Histogram of Age of Patients', size=16)
