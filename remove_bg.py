import sys
import subprocess

try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

import glob
from collections import deque

for file in glob.glob("public/*.jpg"):
    img = Image.open(file).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    # 2D array for visited is much faster than set for large images
    visited = [[False for _ in range(height)] for _ in range(width)]
    
    queue = deque([(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)])
    
    while queue:
        x, y = queue.popleft()
        if visited[x][y]: continue
        visited[x][y] = True
        
        r, g, b, a = pixels[x, y]
        # Threshold for dark background
        if r < 35 and g < 35 and b < 35:
            pixels[x, y] = (0, 0, 0, 0)
            if x > 0 and not visited[x-1][y]: queue.append((x-1, y))
            if x < width-1 and not visited[x+1][y]: queue.append((x+1, y))
            if y > 0 and not visited[x][y-1]: queue.append((x, y-1))
            if y < height-1 and not visited[x][y+1]: queue.append((x, y+1))

    png_file = file.replace('.jpg', '.png')
    img.save(png_file, "PNG")
    print("Saved", png_file)
