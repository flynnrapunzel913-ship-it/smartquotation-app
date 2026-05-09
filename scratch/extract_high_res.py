import json
import fitz
import os

with open("scratch/pdf_structure.json", "r") as f:
    structure = json.load(f)

# List of items to look for (with typos found in PDF)
target_items = [
    "SWIMMING POOL FILTER",
    "FILTER MEDIA",
    "06 WAY MULTIPORT VALVE",
    "RECIRCULATING PUMP",
    "POOL MAIN DRAIN",
    "WALL INLETS",
    "SWIMMING POOL LADDER",
    "STD SKIMMER",
    "LABOUR CHARGES - PLANT ROOM & BASIN EQUIPMENTS",
    "PLUMBING MATERIALS",
    "CONTROL & REGULATING EQUIPMENTS",
    "LABOUR CHARGES - PLUMBING WORKS",
    "UNDERWATER LIGHT",
    "ELECTRICAL MATERIALS",
    "LABOUR CHARGES - POOL ELECTRICAL WORKS",
    "POOL STARTER FOR PUMPS & LIGHTS",
    "TRANSFORMER FOR POOL LIGHTS",
    "TESTING & COMMISSIOINING OF THE POOL", 
    "VACCUM HEAD", 
    "VACCUM HOSE", 
    "TELESCOPIC ROD",
    "DEEP LEAF RAKE",
    "WATER TEST KIT",
    "POOL BRUSH",
    "POOL CHEMICALS",
    "WATER PROOFING",
    "COPING STONE",
    "SWIMMING POOL TILES"
]

def clean_name(name):
    name = name.replace("VACCUM", "VACUUM").replace("COMMISSIOINING", "COMMISSIONING")
    return name.lower().replace(" ", "-").replace("&", "and").replace("/", "-").replace("--", "-").replace(":", "").strip("-")

mapping = {}
doc = fitz.open("templates/mr-swimming-pool-template.pdf")
os.makedirs("public/template-images/mr-swimming-pools", exist_ok=True)

# Use a higher DPI for extraction
# Matrix(4, 4) is 4x scale (approx 288 DPI if original is 72)
# We can use fitz.Matrix(300/72, 300/72) for exactly 300 DPI
zoom = 300 / 72
matrix = fitz.Matrix(zoom, zoom)

for page_data in structure:
    page_idx = page_data["page"] - 1
    page = doc[page_idx]
    
    for item in target_items:
        item_bbox = None
        for block in page_data["text_blocks"]:
            if item.upper() in block["text"].upper():
                item_bbox = block["bbox"]
                break
        
        if item_bbox:
            nearest_img = None
            min_dist = float('inf')
            
            for img in page_data["images"]:
                item_center = [(item_bbox[0] + item_bbox[2])/2, (item_bbox[1] + item_bbox[3])/2]
                img_center = [(img["bbox"][0] + img["bbox"][2])/2, (img["bbox"][1] + img["bbox"][3])/2]
                
                dist = ((item_center[0] - img_center[0])**2 + (item_center[1] - img_center[1])**2)**0.5
                
                if dist < min_dist:
                    min_dist = dist
                    nearest_img = img
            
            if nearest_img and min_dist < 500:
                img_name = clean_name(item) + ".png" # Use PNG for quality
                out_path = os.path.join("public/template-images/mr-swimming-pools", img_name)
                
                # Extract image with high resolution
                pix = page.get_pixmap(matrix=matrix, clip=nearest_img["bbox"])
                pix.save(out_path)
                
                clean_item_key = item.replace("VACCUM", "VACUUM").replace("COMMISSIOINING", "COMMISSIONING")
                mapping[clean_item_key] = img_name
                print(f"Mapped '{item}' to {img_name} (High Res)")

doc.close()

with open("scratch/final_image_mapping_high_res.json", "w") as f:
    json.dump(mapping, f, indent=2)

print(f"Extraction complete. {len(mapping)} high-res images mapped.")
