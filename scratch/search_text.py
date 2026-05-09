import json

with open("scratch/pdf_structure.json", "r") as f:
    structure = json.load(f)

keywords = ["TESTING", "VACUUM", "COMMISSIONING", "HEAD", "HOSE"]

for page in structure:
    print(f"Page {page['page']}:")
    for block in page["text_blocks"]:
        for kw in keywords:
            if kw.upper() in block["text"].upper():
                print(f"  Found: {block['text']}")
