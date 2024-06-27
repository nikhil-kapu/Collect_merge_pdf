import React, { useState } from 'react';
import axios from 'axios';

const FindPdfs = ({ setPdfList }) => {
    const [rootFolder, setRootFolder] = useState('');
    const [pdfFiles, setPdfFiles] = useState([]);

    const handleFolderChange = (event) => {
        const folderPath = event.target.files[0].webkitRelativePath.split('/')[0];
        setRootFolder(folderPath);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/find_pdfs', { rootFolder });
            setPdfFiles(response.data.pdf_files);
            setPdfList(response.data.pdf_files);
        } catch (error) {
            console.error('Error finding PDFs:', error);
        }
    };

    return (
        <div>
            <h2>Find PDFs</h2>
            <form onSubmit={handleSubmit}>
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
            <ul>
                {pdfFiles.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </div>
    );
};

export default FindPdfs;
