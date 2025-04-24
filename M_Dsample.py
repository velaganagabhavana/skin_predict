import os
import numpy as np
import pandas as pd
import tensorflow as tf
import seaborn as sns
import matplotlib.pyplot as plt
from .config import MAPS

def LOAD(filepath):
    data = pd.read_csv(filepath)
    y = data.pop('label')
    x = np.array(data).reshape(-1, 28, 28, 3)
    x = tf.image.resize(x, (32, 32))
    return x, y

def PLOT_FREQ(y):
    y_df = pd.DataFrame(y.argmax(axis=1), columns=['label'])
    y_df['disease'] = y_df['label'].map(lambda x: MAPS[x][0])

    plt.figure(figsize=(8, 6))
    sns.countplot(x='disease', data=y_df, order=[MAPS[i][0] for i in range(len(MAPS))])
    plt.xlabel('Disease', size=12)
    plt.ylabel('Frequency', size=12)
    plt.title('Frequency Distribution of Classes After Oversampling', size=16)
    plt.xticks(rotation=45)
    plt.show()

if __name__ == "__main__":
    x, y = LOAD('./data/hmnist_28_28_RGB.csv')
    PLOT_FREQ(y)
