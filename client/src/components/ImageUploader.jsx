import React, { useState } from "react";
import Dropzone from 'react-dropzone';
import '../css/ImageUploader.css';
import uploadIcon from '../assets/ImageUpload.png';

export default function ImageUploader() {
    const [files, setFiles] = useState([]);
    const [clusters, setClusters] = useState([]);

    const handleDrop = (acceptedFiles) => {
        setFiles([...files, ...acceptedFiles]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append('files', file);
        });
        const response = await axios.post('/cluster_images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setClusters(response.data);
    };
    return (
        <section className="container">
            <Dropzone onDrop={handleDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="uploadArea">
                        <input {...getInputProps()} />
                        <img
                            src={uploadIcon}
                            className="uploadIcon"
                            alt="Upload icon"
                        />
                        {files.length ? (files.length + " files") : ""}
                        {console.log(files)}
                        <button className="uploadButton">Choose images to upload</button>
                        <span className="uploadText">or drag and drop them here</span>
                    </div>
                )}
            </Dropzone>
            <span className="uploadInstructions">
                Upload at least 5 images for better accuracy
            </span>
        </section>
    );
}