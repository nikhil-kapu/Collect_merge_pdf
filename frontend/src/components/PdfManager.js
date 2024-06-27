import React, { useState } from 'react';
import axios from 'axios';

const PdfManager = () => {
    const [rootFolder, setRootFolder] = useState('');
    const [outputPath, setOutputPath] = useState('');
    const [pdfFiles, setPdfFiles] = useState([]);
    const [message, setMessage] = useState('');

    const handleFolderChange = (event) => {
        const folderPath = event.target.files[0].webkitRelativePath.split('/')[0];
        setRootFolder(folderPath);
    };

    const handleFindPdfs = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/find_pdfs', { rootFolder });
            setPdfFiles(response.data.pdf_files);
        } catch (error) {
            console.error('Error finding PDFs:', error);
        }
    };

    const handleMergePdfs = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/merge_pdfs', {
                pdf_list: pdfFiles,
                output_path: outputPath,
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error merging PDFs:', error);
            setMessage('Error merging PDFs');
        }
    };

    return (
        <div>
            <h2>PDF Manager</h2>
            <form onSubmit={handleFindPdfs}>
                <input
                    type="file"
                    webkitdirectory="true"
                    directory="true"
                    onChange={handleFolderChange}
                    style={{ display: 'none' }}
                    id="folderInput"
                />
                <input
                    type="text"
                    value={rootFolder}
                    placeholder="Click to select folder"
                    onClick={() => document.getElementById('folderInput').click()}
                    readOnly
                />
                <button type="submit">Find PDFs</button>
            </form>
            {pdfFiles.length > 0 && (
                <div>
                    <form onSubmit={handleMergePdfs}>
                        <input
                            type="text"
                            value={outputPath}
                            onChange={(e) => setOutputPath(e.target.value)}
                            placeholder="Enter output path for merged PDF"
                            required
                        />
                        <button type="submit">Merge PDFs</button>
                    </form>
                    {message && <p>{message}</p>}
                    <ul>
                        {pdfFiles.map((file, index) => (
                            <li key={index}>{file}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PdfManager;
