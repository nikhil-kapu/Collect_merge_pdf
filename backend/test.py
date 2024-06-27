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
        output_path = os.path.join(output_path, "merged1.pdf")
    
    merger.write(output_path)
    merger.close()

def find_and_merge_pdfs(root_folder):
    pdf_files = []
    for dirpath, _, filenames in os.walk(root_folder):
        for file in filenames:
            if file.lower().endswith('.pdf'):
                pdf_files.append(os.path.join(dirpath, file))

    if not pdf_files:
        print("No PDF files found in the specified folder.")
        return

    merger = PdfMerger()
    for pdf in pdf_files:
        merger.append(pdf)

    output_path = os.path.join(root_folder, "merged2.pdf")
    merger.write(output_path)
    merger.close()
    print(f"Merged PDF created successfully at {output_path}")

if __name__ == "__main__":
    root_folder = input("Enter the path to the root folder: ")
    output_path = root_folder

    find_and_merge_pdfs(root_folder)
    
    pdf_files = find_pdfs(root_folder)
    if pdf_files:
        merge_pdfs(pdf_files, output_path)
        print(f"Merged PDF created successfully at {output_path}")
    else:
        print("No PDF files found in the specified folder.")
