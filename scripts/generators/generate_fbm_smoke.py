import numpy as np
from PIL import Image, ImageFilter

def make_crimson_energy_background():
    w, h = 1920, 1080
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    
    # Energy core center behind head & shoulders
    cx, cy = w * 0.73, h * 0.35
    
    np.random.seed(42)
    def spectral_noise(alpha=2.2):
        fx = np.fft.fftfreq(w)
        fy = np.fft.fftfreq(h)
        FX, FY = np.meshgrid(fx, fy)
        freq = np.sqrt(FX**2 + FY**2)
        freq[0, 0] = 1.0
        amplitude = 1.0 / (freq ** alpha)
        amplitude[0, 0] = 0.0
        phase = np.random.uniform(0, 2 * np.pi, (h, w))
        f_spectrum = amplitude * (np.cos(phase) + 1j * np.sin(phase))
        noise = np.real(np.fft.ifft2(f_spectrum))
        return ((noise - noise.min()) / (noise.max() - noise.min() + 1e-6)).astype(np.float32)

    n1 = spectral_noise(1.8)
    n2 = spectral_noise(2.2)
    n3 = spectral_noise(2.7)
    
    # Fluid domain warping for billowing smoke tendrils
    warp_x = (n2 - 0.5) * 180.0
    warp_y = (n3 - 0.5) * 180.0
    
    dx = (x + warp_x - cx) / (w * 0.36)
    dy = (y + warp_y - cy) / (h * 0.36)
    dist_warped = np.sqrt(dx**2 + dy**2)
    
    # Radial distance from head
    raw_dist = np.sqrt(((x - cx) / (w * 0.38))**2 + ((y - cy) / (h * 0.38))**2)
    
    # 1. Large glowing red energy halo behind head and shoulders
    halo_core = np.exp(-raw_dist * 2.0) * 1.55
    halo_mid = np.exp(-raw_dist * 1.1) * 1.05
    halo_ambient = np.exp(-dist_warped * 0.8) * 0.75
    
    # 2. Volumetric smoke billows
    billows = (n1 * 0.5 + n2 * 0.35 + n3 * 0.15)
    smoke_wisps = np.sin(billows * np.pi * 3.0 + n2 * 2.5) * 0.5 + 0.5
    smoke = (smoke_wisps ** 1.3) * (halo_core + halo_mid + halo_ambient) * 1.4
    
    # Atmospheric clouds rising up to top right
    top_right = np.exp(-(((x - w * 0.80) / (w * 0.35))**2 + ((y - h * 0.20) / (h * 0.35))**2))
    smoke += top_right * billows * 0.8
    
    # 3. Text isolation mask (Left 42% is deep velvet black)
    left_fade = 1.0 / (1.0 + np.exp(-((x - w * 0.44) / (w * 0.075))))
    smoke *= left_fade
    
    # Perimeter vignette
    edge_x = np.sin(np.clip(x / w, 0, 1) * np.pi) ** 0.35
    edge_y = np.sin(np.clip(y / h, 0, 1) * np.pi) ** 0.35
    smoke *= (edge_x * edge_y)
    
    # 4. Color Grading: Deep Black -> Rich Burgundy -> Pure Crimson & Scarlet (NO yellow!)
    val = np.clip(smoke, 0.0, 2.5)
    
    # Pure Scarlet / Crimson Spectrum:
    r = np.clip(val * 195.0 + (val**1.6) * 45.0, 5, 255)
    g = np.clip(val * 14.0 + np.maximum(0, val - 1.2) * 35.0, 3, 55)   # strictly crimson/scarlet
    b = np.clip(val * 24.0 + np.maximum(0, val - 1.4) * 45.0, 6, 85)   # deep wine/magenta tone
    
    img_array = np.stack([r, g, b], axis=-1).astype(np.uint8)
    img = Image.fromarray(img_array)
    
    # Gaussian blur for soft volumetric depth
    img = img.filter(ImageFilter.GaussianBlur(radius=2.5))
    
    out_path = r"c:\Users\punit\OneDrive\Desktop\PROJECTS\NEW_PORTFOLIO\frontend\public\cinematic-energy-core.jpg"
    img.save(out_path, quality=96)
    print(f"Generated pure crimson energy background at: {out_path}")

if __name__ == "__main__":
    make_crimson_energy_background()
