import os
from PyPDF2 import PdfMerger

def find_pdfs(root_folder):
    pdf_files = []
    for dirpath, _, filenames in os.walk(root_folder):
        for file in filenames:
            if file.lower().endswith('.pdf'):
                pdf_files.append(os.path.join(dirpath, file))
    return pdf_files

def merge_pdfs(pdf_list, output_path):
    merger = PdfMerger()
    for pdf in pdf_list:
        merger.append(pdf)
    
    if os.path.isdir(output_path):
        output_path = os.path.join(output_path, "merged.pdf")
    
    merger.write(output_path)
    merger.close()

if __name__ == "__main__":
    root_folder = input("Enter the path to the root folder: ")
    output_path = input("Enter the path for the output merged PDF (including filename): ")
    
    pdf_files = find_pdfs(root_folder)
    if pdf_files:
        merge_pdfs(pdf_files, output_path)
        print(f"Merged PDF created successfully at {output_path}")
    else:
        print("No PDF files found in the specified folder.")
