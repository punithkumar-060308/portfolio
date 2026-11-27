import os
import math
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw

def generate_pure_energy_core():
    width = 1920
    height = 1080
    
    # Coordinates grid
    y_coords, x_coords = np.mgrid[0:height, 0:width].astype(np.float32)
    
    # Center of the glowing energy core positioned precisely behind head & shoulders
    # In a 1440x720 scene, portrait is at x=780..1340, head is at x=980..1120, y=120..320
    # On 1920x1080, that's cx ~ 1400 (73%), cy ~ 380 (35%)
    cx = width * 0.73
    cy = height * 0.35
    
    # 1. Procedural domain-warped multi-octave turbulence noise
    np.random.seed(1337)
    def noise_layer(scale):
        hs = int(math.ceil(height / scale)) + 3
        ws = int(math.ceil(width / scale)) + 3
        grid = np.random.uniform(0, 1, (hs, ws)).astype(np.float32)
        im = Image.fromarray((grid * 255).astype(np.uint8))
        im = im.resize((width, height), Image.Resampling.BICUBIC)
        im = im.filter(ImageFilter.GaussianBlur(radius=scale * 0.5))
        return np.array(im, dtype=np.float32) / 255.0

    # Multi-frequency noise octaves
    oct1 = noise_layer(320)
    oct2 = noise_layer(160)
    oct3 = noise_layer(80)
    oct4 = noise_layer(40)
    oct5 = noise_layer(20)
    
    # Domain warping for fluid smoke vortices and wisps
    warp_x = (oct3 - 0.5) * 160.0 + (oct4 - 0.5) * 60.0
    warp_y = (oct2 - 0.5) * 160.0 + (oct5 - 0.5) * 60.0
    
    # Radii from core center
    wx = x_coords + warp_x - cx
    wy = y_coords + warp_y - cy
    dist_warped = np.sqrt((wx / (width * 0.42))**2 + (wy / (height * 0.38))**2)
    
    raw_dist = np.sqrt(((x_coords - cx) / (width * 0.46))**2 + ((y_coords - cy) / (height * 0.42))**2)
    
    # Radiant core energy halo (intense localized red halo behind head)
    halo_core = np.exp(-raw_dist * 3.5) * 1.8
    halo_mid = np.exp(-raw_dist * 1.8) * 1.1
    halo_wide = np.exp(-dist_warped * 1.1) * 0.9
    
    # Swirling smoke cloud density
    smoke = (oct1 * 0.35 + oct2 * 0.30 + oct3 * 0.20 + oct4 * 0.10 + oct5 * 0.05)
    smoke_ridges = np.abs(smoke - 0.5) * 2.0
    smoke_ridges = 1.0 - np.abs(np.sin(smoke_ridges * np.pi * 2.2)) * 0.6
    
    # Volumetric light beams spreading outward from core
    angle = np.arctan2(wy, wx)
    light_rays = np.sin(angle * 14.0 + oct2 * 6.0) * 0.5 + 0.5
    light_rays = (light_rays ** 2.5) * np.exp(-raw_dist * 1.4) * 0.65
    
    # Total combined energy field
    energy = (halo_core * 1.4 + halo_mid * 0.9 + halo_wide * 0.7) * (smoke_ridges * 0.75 + 0.55) + light_rays
    
    # Add billowing smoke plumes
    plumes = (oct2 * 0.6 + oct3 * 0.4) * np.exp(-dist_warped * 0.8) * 1.2
    energy += plumes
    
    # Left vignette: Keep the left 45% dark for text contrast
    # Sharp transition around x = width * 0.40
    left_fade = 1.0 / (1.0 + np.exp(-((x_coords - width * 0.44) / (width * 0.07))))
    energy *= left_fade
    
    # Outer container border vignette
    vx = np.sin(np.clip(x_coords / width, 0, 1) * np.pi) ** 0.4
    vy = np.sin(np.clip(y_coords / height, 0, 1) * np.pi) ** 0.4
    energy *= (vx * vy)
    
    # Clean Reference Smoke Wisps (Only the pure smoke from top-right corner of reference)
    ref_path = r"C:\Users\punit\.gemini\antigravity\brain\99f0ac85-a3ef-4f49-a772-218609f43b09\.user_uploaded\media_1795713612007_35b985de.jpg"
    if os.path.exists(ref_path):
        ref = Image.open(ref_path).convert("RGB")
        rw, rh = ref.size
        # Pure smoke in top-right: x: 780..1024, y: 0..380 (no person here at all!)
        pure_smoke_crop = ref.crop((int(rw * 0.78), 0, rw, int(rh * 0.42)))
        pure_smoke_crop = pure_smoke_crop.resize((int(width * 0.38), int(height * 0.45)), Image.Resampling.LANCZOS)
        
        # Soft feather mask
        sm_mask = Image.new("L", pure_smoke_crop.size, 0)
        draw = ImageDraw.Draw(sm_mask)
        draw.ellipse((20, 20, pure_smoke_crop.width - 20, pure_smoke_crop.height - 20), fill=180)
        sm_mask = sm_mask.filter(ImageFilter.GaussianBlur(radius=50))
    else:
        pure_smoke_crop = None

    # Color Mapping:
    # Deep Black `#050407` -> Dark Burgundy `#3b030e` -> Deep Crimson `#8c0822` -> 
    # Intense Scarlet Fire `#e6163e` -> Hot Radiant Red `#ff3355` -> Blazing Energy Core `#ff7788`
    
    e = np.clip(energy, 0.0, 2.5)
    
    # Red channel
    r = np.clip(e * 190.0 + (e**2) * 45.0, 5, 255)
    # Green channel (creates warm fiery scarlet and orange-red glow at center)
    g = np.clip((e - 0.45) * 45.0 + np.maximum(0, e - 1.1) * 95.0, 3, 215)
    # Blue channel (burgundy wine tone in shadows, incandescent magenta-white at core)
    b = np.clip(e * 16.0 + np.maximum(0, e - 1.2) * 85.0, 7, 195)
    
    base_arr = np.stack([r, g, b], axis=-1).astype(np.uint8)
    base_img = Image.fromarray(base_arr)
    
    # Blend in pure reference smoke wisps in top right if available
    if pure_smoke_crop is not None:
        px = int(width * 0.62)
        py = int(height * 0.02)
        bg_slice = base_img.crop((px, py, px + pure_smoke_crop.width, py + pure_smoke_crop.height))
        blended = Image.blend(bg_slice, pure_smoke_crop, 0.42)
        base_img.paste(blended, (px, py), sm_mask)

    # 4. Subtle atmospheric floating embers (warm fiery glowing particles)
    draw = ImageDraw.Draw(base_img)
    np.random.seed(777)
    for _ in range(110):
        ex = np.random.uniform(width * 0.46, width * 0.95)
        ey = np.random.uniform(height * 0.06, height * 0.94)
        er = np.random.uniform(1.2, 3.6)
        brightness = np.random.uniform(190, 255)
        
        # Soft outer ember glow
        draw.ellipse((ex - er * 3.0, ey - er * 3.0, ex + er * 3.0, ey + er * 3.0),
                     fill=(int(brightness * 0.45), 5, 12))
        # Bright ember core
        draw.ellipse((ex - er, ey - er, ex + er, ey + er),
                     fill=(int(brightness), int(brightness * 0.55), int(brightness * 0.35)))
        
        # Occasional ember motion streak
        if np.random.random() > 0.65:
            streak_len = np.random.uniform(4, 12)
            draw.line([(ex, ey), (ex - streak_len * 0.7, ey + streak_len * 0.7)], 
                      fill=(int(brightness * 0.8), int(brightness * 0.4), 20), width=1)

    # Gentle atmospheric Gaussian smoothing
    base_img = base_img.filter(ImageFilter.GaussianBlur(radius=1.0))
    
    out_path = r"c:\Users\punit\OneDrive\Desktop\PROJECTS\NEW_PORTFOLIO\frontend\public\cinematic-smoke-fire.jpg"
    base_img.save(out_path, quality=95)
    print(f"Generated clean cinematic energy core smoke background at: {out_path}")

if __name__ == "__main__":
    generate_pure_energy_core()
