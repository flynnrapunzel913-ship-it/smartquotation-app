import os
import shutil

src_dir = "public/template-images/mr-swimming-pools/extraction"
dest_dir = "public/template-images/mr-swimming-pools"

mapping = {
    "image_p2_7.jpeg": "std-skimmer.jpg",
    "image_p3_1.jpeg": "labour-plant-room.jpg",
    "image_p3_2.jpeg": "plumbing-materials.jpg",
    "image_p3_3.jpeg": "control-regulating-equipment.jpg",
    "image_p3_4.jpeg": "labour-plumbing.jpg",
    "image_p3_5.jpeg": "underwater-light.jpg",
    "image_p3_6.jpeg": "electrical-materials.jpg",
    "image_p3_7.jpeg": "labour-pool-electrical.jpg",
    "image_p3_8.jpeg": "pool-starter-panel.jpg",
    "image_p3_9.jpeg": "transformer.jpg",
    "image_p3_10.jpeg": "testing-commissioning.jpg",
    "image_p5_1.jpeg": "waterproofing.jpg",
    "image_p5_2.jpeg": "coping-stone.jpg",
    "image_p5_3.jpeg": "swimming-pool-tiles.jpg",
}

for src_name, dest_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_path):
        print(f"Copying {src_name} to {dest_name}")
        shutil.copy2(src_path, dest_path)
    else:
        print(f"Warning: {src_name} not found")

print("Renaming complete.")
