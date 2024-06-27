import React, { useState, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert, Box } from '@mui/material';

function App() {
    const [rootFolder, setRootFolder] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info'); // For setting the alert type
    const fileInputRef = useRef(null);

    const handleMergePdfs = async () => {
        try {
            const response = await axios.post('http://localhost:8000/merge_pdfs', { root_folder: rootFolder });
            if (response && response.data) {
                setMessage(response.data.message);
                setSeverity('success');
            } else {
                setMessage('An unexpected error occurred.');
                setSeverity('error');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setMessage('An error occurred: ' + error.response.data.detail);
                setSeverity('error');
            } else {
                setMessage('An unexpected error occurred.');
                setSeverity('error');
            }
        }
    };

    const handleFolderSelection = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const directoryPath = files[0].webkitRelativePath.split('/')[0];
            const folderPath = files[0].path; // Attempt to capture the full path

            setRootFolder(folderPath || directoryPath);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    PDF Merger
                </Typography>
                <TextField
                    fullWidth
                    label="Select the root folder"
                    variant="outlined"
                    value={rootFolder}
                    onClick={() => fileInputRef.current.click()}
                    readOnly
                    sx={{ mb: 2 }}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    webkitdirectory="true"
                    mozdirectory="true"
                    directory="true"
                    multiple
                    onChange={handleFolderSelection}
                />
                <Button variant="contained" color="primary" onClick={handleMergePdfs}>
                    Merge PDFs
                </Button>
                {message && (
                    <Alert severity={severity} sx={{ mt: 3 }}>
                        {message}
                    </Alert>
                )}
            </Box>
        </Container>
    );
}

export default App;
