from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import os
from collect_merge_pdf import find_pdfs, merge_pdfs

app = FastAPI()

class FindPdfsRequest(BaseModel):
    root_folder: str

class MergePdfsRequest(BaseModel):
    pdf_list: List[str]
    output_path: str

@app.post("/find_pdfs")
def call_find_pdfs(request: FindPdfsRequest):
    if not os.path.isdir(request.root_folder):
        raise HTTPException(status_code=400, detail="Invalid root folder path.")
    pdf_files = find_pdfs(request.root_folder)
    return {"pdf_files": pdf_files}

@app.post("/merge_pdfs")
def call_merge_pdfs(request: MergePdfsRequest):
    if not request.pdf_list:
        raise HTTPException(status_code=400, detail="PDF list is empty.")
    try:
        merge_pdfs(request.pdf_list, request.output_path)
        return {"message": f"Merged PDF created successfully at {request.output_path}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
