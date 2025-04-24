import io
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from skimage.feature import hog
from skimage.color import rgb2gray

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

model_path = "./model"
model = None
try:
    print("Loading Model...")
    model = tf.keras.models.load_model(model_path)
    input_shape = model.input_shape[1:3]
    print(f"Model Loaded Successfully. Expected Input Shape: {input_shape}")
except Exception as e:
    print(f"Error loading model: {e}")


class_labels = {0: "akiec", 1: "bcc", 2: "bkl", 3: "df", 4: "mel", 5: "nv", 6: "vasc"}

def preprocess_image(img):
    img = img.resize(input_shape)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  
    img_array = img_array / 255.0 
    return img_array

def extract_features(img):
    try:
        img_gray = rgb2gray(np.array(img.resize((64, 64)))) 
        features, _ = hog(img_gray, pixels_per_cell=(16, 16), cells_per_block=(2, 2), feature_vector=True, visualize=True)
        features = features / np.linalg.norm(features) if np.linalg.norm(features) > 0 else features
        return features.tolist() 
     
    except Exception as e:
        print(f"Error extracting features: {e}")
        # return jsonify({"is_skin":True}), 500
    
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files["file"]
    
    try:
        img = Image.open(io.BytesIO(file.read()))  
        print("Image size : ",img.size)
        # if img.size != (32, 32):
        #     return jsonify({"is_skin":True}), 400

        if model is None:
            print("model is not loaded")
            return jsonify({"error": "Model not loaded"}), 500
        
        processed_img = preprocess_image(img)
        predictions = model.predict(processed_img)
        predicted_class = np.argmax(predictions)
        print("Predictions : ",predictions[0])
        confidence = float(predictions[0][predicted_class]) * 100 
        extracted_features = extract_features(img)
        print("Extracted Features are : ",extract_features)
        response = {
            "predicted_class": class_labels[predicted_class],
            "confidence": confidence,
            # "features": extracted_features
        }

        return jsonify(response)

    except Exception as e:
        print("Exception ",e)
        return jsonify({"error": f"Prediction failed: {e}"}), 500
    
if __name__ == "__main__":
    app.run(debug=False)
