import os
import math
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw

def generate_cinematic_smoke():
    width = 1920
    height = 1080
    
    # 1. Base dark burgundy to black canvas
    base = np.zeros((height, width, 3), dtype=np.float32)
    
    # Coordinates grid
    y_coords, x_coords = np.mgrid[0:height, 0:width]
    
    # Center of the energy core behind the head and shoulders (roughly 72% X, 36% Y)
    cx = width * 0.72
    cy = height * 0.36
    
    # Distance from energy core center
    dist_x = (x_coords - cx) / (width * 0.45)
    dist_y = (y_coords - cy) / (height * 0.40)
    dist_core = np.sqrt(dist_x**2 + dist_y**2)
    
    # Left vignette factor (keeps left 40% very dark for text contrast)
    left_mask = 1.0 / (1.0 + np.exp(-((x_coords - width * 0.42) / (width * 0.08))))
    
    # Generate multi-scale domain-warped fractal noise for organic smoke tendrils
    np.random.seed(42)
    def noise(scale, octaves=4):
        h_s = int(math.ceil(height / scale)) + 2
        w_s = int(math.ceil(width / scale)) + 2
        grid = np.random.uniform(0, 1, (h_s, w_s)).astype(np.float32)
        im = Image.fromarray((grid * 255).astype(np.uint8))
        im = im.resize((width, height), Image.Resampling.BICUBIC)
        im = im.filter(ImageFilter.GaussianBlur(radius=scale * 0.45))
        return np.array(im, dtype=np.float32) / 255.0

    n1 = noise(180)
    n2 = noise(90)
    n3 = noise(45)
    n4 = noise(22)
    
    # Domain warping (adds fluid curl tendrils)
    warp_x = (n2 - 0.5) * 80.0
    warp_y = (n3 - 0.5) * 80.0
    
    dist_warped = np.sqrt(((x_coords + warp_x - cx) / (width * 0.40))**2 + 
                          ((y_coords + warp_y - cy) / (height * 0.38))**2)
    
    # Core energy halo glow
    core_intensity = np.exp(-dist_warped * 2.2) * 1.3
    core_intensity += np.exp(-dist_core * 1.2) * 0.8
    
    # Smoke cloud density using warped noise octaves
    smoke_density = (n1 * 0.45 + n2 * 0.30 + n3 * 0.18 + n4 * 0.07)
    smoke_tendrils = np.sin(smoke_density * 8.0 + n2 * 4.0) * 0.5 + 0.5
    smoke_combined = (smoke_density * 0.65 + smoke_tendrils * 0.35) * core_intensity * 1.5
    
    # Apply left fade mask
    smoke_combined *= left_mask
    
    # Outer edge vignette
    edge_x = np.sin(x_coords / width * np.pi)
    edge_y = np.sin(y_coords / height * np.pi)
    edge_vignette = (edge_x * edge_y) ** 0.35
    smoke_combined *= edge_vignette
    
    # Color mapping:
    # 0.0 -> [5, 4, 7] (pure deep dark)
    # 0.25 -> [50, 4, 14] (dark burgundy)
    # 0.55 -> [165, 12, 38] (rich crimson)
    # 0.85 -> [235, 30, 65] (scarlet red fire)
    # 1.15 -> [255, 75, 95] (hot glowing energy core)
    # 1.4+ -> [255, 140, 155] (incandescent center)
    
    c = np.clip(smoke_combined, 0.0, 2.0)
    
    # R channel
    r = np.clip(c * 240.0 + (c**2) * 45.0, 5, 255)
    # G channel (warm scarlet to orange-pink glow at highest intensity)
    g = np.clip((c - 0.35) * 55.0 + np.maximum(0, c - 0.8) * 90.0, 3, 220)
    # B channel (deep violet tint at dark, slight magenta/white at center)
    b = np.clip(c * 22.0 + np.maximum(0, c - 0.9) * 85.0, 6, 200)
    
    img_array = np.stack([r, g, b], axis=-1).astype(np.uint8)
    img = Image.fromarray(img_array)
    
    # 2. Extract and composite organic smoke wisps from reference if available
    ref_path = r"C:\Users\punit\.gemini\antigravity\brain\99f0ac85-a3ef-4f49-a772-218609f43b09\.user_uploaded\media_1795713612007_35b985de.jpg"
    if os.path.exists(ref_path):
        ref_img = Image.open(ref_path).convert("RGB")
        rw, rh = ref_img.size
        # Sample the top-right and smoke plumes
        # In ref: top right from x=0.65 to 1.0, y=0.0 to 0.7 is pure crimson smoke!
        smoke_crop = ref_img.crop((int(rw * 0.60), 0, rw, int(rh * 0.70)))
        smoke_crop = smoke_crop.resize((int(width * 0.45), int(height * 0.65)), Image.Resampling.LANCZOS)
        
        # Soft mask for blending
        mask = Image.new("L", smoke_crop.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, smoke_crop.width, smoke_crop.height), fill=200)
        mask = mask.filter(ImageFilter.GaussianBlur(radius=60))
        
        # Paste onto right-hand side behind portrait
        paste_x = int(width * 0.55)
        paste_y = int(height * 0.05)
        img.paste(Image.blend(img.crop((paste_x, paste_y, paste_x + smoke_crop.width, paste_y + smoke_crop.height)), smoke_crop, 0.48), 
                  (paste_x, paste_y), mask)

    # 3. Add ambient atmospheric embers
    draw = ImageDraw.Draw(img)
    np.random.seed(99)
    for _ in range(80):
        ex = np.random.uniform(width * 0.45, width * 0.96)
        ey = np.random.uniform(height * 0.08, height * 0.92)
        er = np.random.uniform(1.2, 3.8)
        eb = np.random.uniform(180, 255)
        # Red ember with soft glow
        draw.ellipse((ex - er * 2.5, ey - er * 2.5, ex + er * 2.5, ey + er * 2.5), fill=(int(eb * 0.4), 0, 10))
        draw.ellipse((ex - er, ey - er, ex + er, ey + er), fill=(int(eb), int(eb * 0.45), int(eb * 0.35)))

    # Smooth blur for cinematic atmospheric integration
    img = img.filter(ImageFilter.GaussianBlur(radius=1.2))
    
    out_path = r"c:\Users\punit\OneDrive\Desktop\PROJECTS\NEW_PORTFOLIO\frontend\public\cinematic-energy-core.jpg"
    img.save(out_path, quality=94)
    print(f"Generated cinematic energy core at: {out_path}")

if __name__ == "__main__":
    generate_cinematic_smoke()
