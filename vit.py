import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import config  
def SINGLE_MLP(x):
    x = tf.keras.layers.Dense(units=config.SINGLE_MLP_UNITS_1, activation="relu")(x)
    x = tf.keras.layers.Dense(units=config.SINGLE_MLP_UNITS_2, activation=None)(x)
    return x

def MLP_ALL(x, hidden_units, dropout_rate):
    for units in hidden_units:
        x = layers.Dense(units, activation=tf.nn.gelu)(x)
        x = layers.Dropout(dropout_rate)(x)
    return x

def BLOCKS(x):
    PRE = x
    x = tf.keras.layers.LayerNormalization()(x)
    x = tf.keras.layers.MultiHeadAttention(
        num_heads=config.BLOCKS_NUM_HEADS, key_dim=config.BLOCKS_KEY_DIM, value_dim=config.BLOCKS_VALUE_DIM
    )(x, x)
    x = PRE + x
    MAH = x
    x = tf.keras.layers.LayerNormalization()(x)
    x = SINGLE_MLP(x) + MAH
    return x

def CREATE_VIT():
    inputs = layers.Input(shape=config.INPUT_SHAPE)
    
    patches = layers.Conv2D(
        filters=config.PROJECTION_DIM, kernel_size=config.PATCH_SIZE, strides=config.PATCH_SIZE, padding="VALID"
    )(inputs)
    patches = layers.Reshape((config.NUM_PATCHES, config.PROJECTION_DIM))(patches)
    
    positions = tf.range(start=0, limit=config.NUM_PATCHES, delta=1)
    position_embedding = layers.Embedding(input_dim=config.NUM_PATCHES, output_dim=config.PROJECTION_DIM)(positions)
    encoded_patches = patches + position_embedding
    
    for _ in range(config.TRANSFORMER_LAYERS):
        x1 = layers.LayerNormalization(epsilon=1e-6)(encoded_patches)
        attention_output = layers.MultiHeadAttention(
            num_heads=config.NUM_HEADS, key_dim=config.PROJECTION_DIM, dropout=0.1
        )(x1, x1)
        x2 = layers.Add()([attention_output, encoded_patches])
        
        x3 = layers.LayerNormalization(epsilon=1e-6)(x2)
        x3 = MLP_ALL(x3, hidden_units=[config.PROJECTION_DIM * 2, config.PROJECTION_DIM], dropout_rate=0.1)
        encoded_patches = layers.Add()([x3, x2])
    
    representation = layers.LayerNormalization(epsilon=1e-6)(encoded_patches)
    representation = layers.Flatten()(representation)
    representation = layers.Dropout(0.5)(representation)
    
    features = MLP_ALL(representation, hidden_units=config.MLP_HEAD_UNITS, dropout_rate=0.5)
    
    logits = layers.Dense(config.NUM_CLASSES)(features)
    outputs = layers.Activation("softmax")(logits)
    
    model = keras.Model(inputs=inputs, outputs=outputs)
    return model

Model = CREATE_VIT()
print(Model.summary())
