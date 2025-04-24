import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.datasets as datasets
from torch.utils.data import DataLoader
import timm
import numpy as np
import matplotlib.pyplot as plt

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

data_dir = "./model"
train_dataset = datasets.ImageFolder(root=f"{data_dir}/train", transform=transform)
val_dataset = datasets.ImageFolder(root=f"{data_dir}/val", transform=transform)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
model = timm.create_model("vit_base_patch16_224", pretrained=True, num_classes=len(train_dataset.classes))
model = model.to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)
# epochs = 50
epochs = 20
train_acc_history = []
val_acc_history = []
train_loss_history = []
val_loss_history = []

for epoch in range(epochs):
    model.train()
    correct, total, train_loss = 0, 0, 0.0
    
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        train_loss += loss.item()
        _, predicted = torch.max(outputs, 1)
        correct += (predicted == labels).sum().item()
        total += labels.size(0)
    
    train_acc = correct / total
    train_loss /= len(train_loader)
    train_acc_history.append(train_acc)
    train_loss_history.append(train_loss)
    model.eval()
    correct, total, val_loss = 0, 0, 0.0
    with torch.no_grad():
        for images, labels in val_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)
            val_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            correct += (predicted == labels).sum().item()
            total += labels.size(0)
    
    val_acc = correct / total
    val_loss /= len(val_loader)
    val_acc_history.append(val_acc)
    val_loss_history.append(val_loss)
    
    print(f"Epoch {epoch+1}/{epochs} - Train Acc: {train_acc:.4f}, Val Acc: {val_acc:.4f}, Train Loss: {train_loss:.4f}, Val Loss: {val_loss:.4f}")

best_epoch = np.argmax(val_acc_history)

plt.figure(figsize=(8,6))
plt.plot(range(1, epochs+1), train_acc_history, label='Train Accuracy', marker='o', color='blue')
plt.plot(range(1, epochs+1), val_acc_history, label='Validation Accuracy', marker='s', color='red')
plt.axvline(x=best_epoch+1, linestyle='--', color='green', label=f'Best Epoch {best_epoch+1}')
plt.xlabel("Epochs")
plt.ylabel("Accuracy")
plt.ylim(0.6, 1.0)
plt.title("Training & Validation Accuracy vs. Epochs")
plt.legend()
plt.grid(True)
plt.show()

plt.figure(figsize=(8,6))
plt.plot(range(1, epochs+1), train_loss_history, label='Train Loss', marker='o', color='blue')
plt.plot(range(1, epochs+1), val_loss_history, label='Validation Loss', marker='s', color='red')
plt.axvline(x=best_epoch+1, linestyle='--', color='green', label=f'Best Epoch {best_epoch+1}')
plt.xlabel("Epochs")
plt.ylabel("Loss")
plt.ylim(0, 2.0)
plt.title("Training & Validation Loss vs. Epochs")
plt.legend()
plt.grid(True)
plt.show()
