import fitz
from PIL import Image
import io
import os

doc = fitz.open("templates/mr-swimming-pool-template.pdf")
os.makedirs("public/template-images/mr-swimming-pools", exist_ok=True)

def extract_and_combine(page_num, bbox_list, output_name):
    page = doc[page_num - 1]
    zoom = 600 / 72  # 600 DPI for high quality
    matrix = fitz.Matrix(zoom, zoom)
    
    images = []
    for bbox in bbox_list:
        pix = page.get_pixmap(matrix=matrix, clip=bbox)
        img = Image.open(io.BytesIO(pix.tobytes("png")))
        images.append(img)
    
    if not images:
        return
    
    # Combine side by side
    total_width = sum(img.width for img in images) + (len(images) - 1) * 20 # 20px spacing
    max_height = max(img.height for img in images)
    
    combined = Image.new("RGBA", (total_width, max_height), (255, 255, 255, 0))
    x_offset = 0
    for img in images:
        # Center vertically
        y_offset = (max_height - img.height) // 2
        combined.paste(img, (x_offset, y_offset))
        x_offset += img.width + 20
    
    out_path = os.path.join("public/template-images/mr-swimming-pools", output_name)
    combined.save(out_path, "PNG", quality=95)
    print(f"Saved {output_name}")

# 1. WALL INLETS (Section A, SL No. 6) - Two images on Page 2
extract_and_combine(2, [
    [311.88, 441.24, 358.44, 486.72],
    [318.48, 477.36, 350.64, 508.68]
], "wall-inlets-composite.png")

# 2. PLUMBING MATERIALS (Section A, SL No. 10) - Page 3
extract_and_combine(3, [[301.32, 226.44, 365.76, 287.88]], "plumbing-materials.png")

# 3. CONTROL & REGULATING EQUIPMENTS (Section A, SL No. 11) - Two images on Page 3
extract_and_combine(3, [
    [305.63, 303.23, 332.27, 325.79],
    [300.72, 326.28, 332.51, 358.08]
], "control-regulating-equipments-composite.png")

# 4. LABOUR CHARGES - PLUMBING WORKS (Section A, SL No. 12) - Page 3
extract_and_combine(3, [[303.83, 364.79, 363.83, 419.51]], "labour-plumbing.png")

# 5. ELECTRICAL MATERIALS (Section B, SL No. 1) - Two images on Page 4
extract_and_combine(4, [
    [306.95, 42.95, 356.51, 85.07],
    [315.11, 79.79, 352.91, 117.72]
], "electrical-materials-composite.png")

# 7. WATER PROOFING (Part 2, SL No. 1) - Page 5
extract_and_combine(5, [[304.91, 324.11, 362.63, 373.32]], "waterproofing.png")

doc.close()
