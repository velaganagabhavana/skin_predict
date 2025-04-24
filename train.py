import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from tensorflow.keras.metrics import Recall, Precision, AUC, TruePositives, TrueNegatives, FalseNegatives, FalsePositives
import pandas as pd
import matplotlib.pyplot as plt
from .vit import CREATE_VIT


model = CREATE_VIT()

callback_checkpoint = ModelCheckpoint(
    filepath='best_model.keras',
    monitor='val_accuracy',
    mode='max',
    verbose=1
)

callback_early_stopping = EarlyStopping(
    monitor='val_accuracy',
    patience=10,
    mode='max',
    verbose=1,
    baseline=0.95,
    restore_best_weights=True
)

callbacks = [callback_checkpoint, callback_early_stopping]

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-4),
    loss=keras.losses.CategoricalCrossentropy(),
    metrics=['accuracy', Recall(), Precision(), AUC(), 
             TruePositives(), TrueNegatives(), FalseNegatives(), FalsePositives()]
)

history = model.fit(
    X_train, Y_train, 
    epochs=100, 
    validation_data=(X_test, Y_test), 
    batch_size=128, 
    callbacks=callbacks
)

model.save('trained_model.keras')

pd.DataFrame.from_dict(history.history).to_csv('training_history.csv', index=False)

plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(loc='upper left')

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(loc='upper left')

plt.show()
