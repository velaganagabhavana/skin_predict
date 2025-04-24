import os
import pandas as pd
import torch
from transformers import AutoModelForImageClassification, AutoFeatureExtractor
from PIL import Image
from sklearn.metrics import accuracy_score

ans = {
    "0": "akiec",
    "1": "bcc",
    "2": "bkl",
    "3": "df",
    "4": "mel",
    "5": "nv",
    "6": "vasc"
}
local_model_path = "./model"  
model = AutoModelForImageClassification.from_pretrained(local_model_path)
feature_extractor = AutoFeatureExtractor.from_pretrained(local_model_path)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

print("Model loaded successfully!")
csv_path = r"E:\PROJ-12\data\HAM10000_metadata.csv" 
df = pd.read_csv(csv_path)
part1_folder = r"E:\PROJ-12\data\HAM10000_images_part_1" 
part2_folder = r"E:\PROJ-12\data\HAM10000_images_part_2" 
true_labels = []
predicted_labels = []
missing_images = []
for _, row in df.iterrows():
    image_id = row["image_id"] + ".jpg" 
    true_dx = row["dx"]  
    image_number = int(row["image_id"].split("_")[-1])  
    
    if 24306 <= image_number <= 29305:
        image_path = os.path.join(part1_folder, image_id)
    elif 29306 <= image_number <= 34320:
        image_path = os.path.join(part2_folder, image_id)
    else:
        print(f"Warning: Image {image_id} is out of known ranges. Skipping...")
        continue
    if not os.path.exists(image_path):
        print(f"Warning: Image {image_id} not found in expected folder. Skipping...")
        missing_images.append(image_id)
        continue

    try:
        image = Image.open(image_path).convert("RGB")
        image = image.resize((32,32))
        inputs = feature_extractor(images=image, return_tensors="pt")
        inputs = {k: v.to(device) for k, v in inputs.items()}
        with torch.no_grad():
            outputs = model(**inputs)
        predicted_class_idx = outputs.logits.argmax(-1).item()
        predicted_class = ans[str(predicted_class_idx)] 
        true_labels.append(true_dx)
        predicted_labels.append(predicted_class)

        print(f"Image: {image_id} -> Predicted: {predicted_class}, Actual: {true_dx}")

    except Exception as e:
        print(f"Error processing {image_id}: {e}")
        
accuracy = accuracy_score(true_labels, predicted_labels)
print(f"\nModel Accuracy: {accuracy * 100:.2f}%")

results_df = pd.DataFrame({"image_id": df["image_id"], "true_dx": true_labels, "predicted_dx": predicted_labels})
results_df.to_csv("classification_results.csv", index=False)

with open("missing_images.txt", "w") as f:
    for image_name in missing_images:
        f.write(f"{image_name}\n")

print("Classification completed! Results saved to classification_results.csv")
print(f"Missing images list saved to missing_images.txt (Total missing: {len(missing_images)})")
