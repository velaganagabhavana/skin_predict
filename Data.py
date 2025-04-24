from matplotlib import pyplot as plt
import matplotlib.image as mpimg
import matplotlib.gridspec as gridspec

rC = 5
cC = 5
index = 0
fig = plt.figure()
gs1 = gridspec.GridSpec(rC, cC)
gs1.update(wspace=0.0, hspace=0.05) 

print(f"{1:04d}")

for row in range(rC):
    for col in range(cC):
        img = mpimg.imread(f'./data/train/{index+1:04d}.jpg')
        ax1 = plt.subplot(gs1[index])
        ax1.axis('off')
        ax1.set_aspect('equal')
        ax1.imshow(img)
        index += 1

plt.tight_layout()
plt.show()
