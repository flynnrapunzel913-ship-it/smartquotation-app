import fitz # PyMuPDF
import os

pdf_path = "templates/mr-swimming-pool-template.pdf"
output_dir = "public/template-images/mr-swimming-pools/extraction"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    
    print(f"Page {page_index + 1} has {len(image_list)} images")
    
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        filename = f"image_p{page_index + 1}_{img_index + 1}.{image_ext}"
        with open(os.path.join(output_dir, filename), "wb") as f:
            f.write(image_bytes)

doc.close()
