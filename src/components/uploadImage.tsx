import React, { useEffect, useState } from 'react';

interface FileProp {
    file: File | null; // file can be a File object or null
    onUpload: (url: string) => void; // onUpload function receives the uploaded URL as a parameter
}

const uploadImage = async (imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch('https://api.imgbb.com/1/upload?key=6167fd267a246964648eae8b1c642dfb', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    return data.data.url; // URL of the uploaded image
};

const UploadComponent: React.FC<FileProp> = ({ file, onUpload }) => {
    const [uploadedUrl, setUploadedUrl] = useState<string>('');

    useEffect(() => {
        const handleUpload = async () => {
            if (file) {
                try {
                    const imageUrl = await uploadImage(file);
                    setUploadedUrl(imageUrl);
                    if (onUpload) {
                        onUpload(imageUrl); // Return the URL to the caller
                    }
                } catch (error) {
                    console.error('Upload failed:');
                }
            } else {
                console.error('No image file provided.');
            }
        };

        handleUpload();
    }, [file, onUpload]);

    return (
        <div>
            {uploadedUrl && <p>Uploaded Image URL: {uploadedUrl}</p>}
        </div>
    );
};

export default UploadComponent;
