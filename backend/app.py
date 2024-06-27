from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from PyPDF2 import PdfMerger

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RootFolder(BaseModel):
    root_folder: str

def find_and_merge_pdfs(root_folder):
    pdf_files = []
    for dirpath, _, filenames in os.walk(root_folder):
        for file in filenames:
            if file.lower().endswith('.pdf'):
                pdf_files.append(os.path.join(dirpath, file))

    if not pdf_files:
        return {"status": "error", "message": "No PDF files found in the specified folder."}

    merger = PdfMerger()
    for pdf in pdf_files:
        merger.append(pdf)

    output_path = os.path.join(root_folder, "merged.pdf")
    merger.write(output_path)
    merger.close()
    return {"status": "success", "message": f"Merged PDF created successfully at {output_path}"}

@app.post("/merge_pdfs")
async def merge_pdfs_endpoint(root_folder: RootFolder):
    result = find_and_merge_pdfs(root_folder.root_folder)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["message"])
    return result

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
