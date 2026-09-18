"""
Generate crisp PNG icons for ContextClip Chrome & Edge extension.
Sizes: 16x16, 32x32, 48x48, 128x128
"""
from PIL import Image, ImageDraw

def create_icon(size):
    # Create RGBA image with transparent background
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Scale factor relative to 128
    scale = size / 128.0
    
    # Rounded background with indigo color (#4F46E5)
    radius = max(2, int(26 * scale))
    pad = max(1, int(4 * scale))
    draw.rounded_rectangle(
        [pad, pad, size - pad - 1, size - pad - 1],
        radius=radius,
        fill=(79, 70, 229, 255) # Indigo-600
    )
    
    # Prompt chevron ">"
    stroke = max(1, int(9 * scale))
    p1 = (int(32 * scale), int(40 * scale))
    p2 = (int(60 * scale), int(64 * scale))
    p3 = (int(32 * scale), int(88 * scale))
    draw.line([p1, p2], fill=(255, 255, 255, 255), width=stroke)
    draw.line([p2, p3], fill=(255, 255, 255, 255), width=stroke)
    
    # Underscore "_"
    u1 = (int(70 * scale), int(88 * scale))
    u2 = (int(96 * scale), int(88 * scale))
    draw.line([u1, u2], fill=(165, 180, 252, 255), width=stroke) # Indigo-200
    
    return img

def main():
    import os
    out_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    sizes = [16, 32, 48, 128]
    for s in sizes:
        icon = create_icon(s)
        path = os.path.join(out_dir, f"icon-{s}.png")
        icon.save(path, "PNG")
        print(f"Generated {path} ({s}x{s})")

if __name__ == "__main__":
    main()
