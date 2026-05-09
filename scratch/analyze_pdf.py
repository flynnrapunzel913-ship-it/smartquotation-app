import fitz
import json

doc = fitz.open("templates/mr-swimming-pool-template.pdf")
results = []

for page_index in range(len(doc)):
    page = doc[page_index]
    page_data = {
        "page": page_index + 1,
        "text_blocks": [],
        "images": []
    }
    
    # Get text with positions
    text_dict = page.get_text("dict")
    for block in text_dict["blocks"]:
        if "lines" in block:
            text = ""
            for line in block["lines"]:
                for span in line["spans"]:
                    text += span["text"] + " "
            page_data["text_blocks"].append({
                "text": text.strip(),
                "bbox": block["bbox"]
            })
            
    # Get images with positions
    image_info = page.get_image_info(hashes=False)
    for img in image_info:
        page_data["images"].append({
            "bbox": img["bbox"],
            "xref": img["number"]
        })
        
    results.append(page_data)

with open("scratch/pdf_structure.json", "w") as f:
    json.dump(results, f, indent=2)

doc.close()
print("PDF structure extracted.")
