import React, { useState } from 'react';
import axios from 'axios';

const MergePdfs = ({ pdfList }) => {
    const [outputPath, setOutputPath] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/merge_pdfs', {
                pdf_list: pdfList,
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
            <h2>Merge PDFs</h2>
            <form onSubmit={handleSubmit}>
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
        </div>
    );
};

export default MergePdfs;
