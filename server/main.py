from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sklearn.cluster import KMeans
import numpy as np
from PIL import Image
import io
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def image_to_vector(image):
    image = image.resize((64, 64)).convert("L")  # Resize and convert to grayscale
    return np.array(image).flatten()

@app.post("/cluster_images/")
async def cluster_images(files: List[UploadFile] = File(...)):
    images = []
    image_ids = []

    for file in files:
        image = Image.open(io.BytesIO(await file.read()))
        images.append(image_to_vector(image))
        image_ids.append(file.filename)

    # Perform clustering
    kmeans = KMeans(n_clusters=3)
    # clusters = kmeans.fit_predict(images)
    n=len(files)
    clusters = np.random.randint(0,n//2,size=n)

    result = [{"img_id": img_id, "cluster_id": int(cluster)} for img_id, cluster in zip(image_ids, clusters)]
    return JSONResponse(result)