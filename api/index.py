from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Tambahkan CORS Middleware agar frontend bisa request ke backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Bisa diganti ke origin spesifik untuk lebih aman di production
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(BASE_DIR, "data_lolos.json")

# Memuat data ke memori saat server mulai, ini jauh lebih cepat daripada baca file setiap request
with open(JSON_PATH, "r") as f:
    data_staff = json.load(f)

@app.get("/api")
async def cek_penerimaan(nrp: str = None):
    if not nrp:
        return {"error": "NRP tidak boleh kosong"}
    
    try:
        # Cari data berdasarkan NRP
        result = next((item for item in data_staff if str(item.get("nrp")) == str(nrp)), None)
        
        if result:
            return {
                "nama": result.get("nama"),
                "posisi": result.get("posisi"),
                "lolos": True,
                "nrp": str(nrp)
            }
        else:
            return {
                "nama": "Tidak Ditemukan",
                "lolos": False,
                "nrp": str(nrp)
            }
    except Exception as e:
        return {"error": str(e)}
