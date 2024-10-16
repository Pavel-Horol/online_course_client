import UserService from '@/services/UserService';
import { useState } from 'react';

const PhotoDrop = () => {
    const [dragging, setDragging] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSendPhoto = async () => {
        try {
            if (selectedFile == null) {
                throw Error('file not selected');
            }
            const response = await UserService.uploadPhoto(selectedFile);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };
    return (
        <>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`mb-4 p-4 border-2 border-dashed rounded-lg size-40 ${
                    dragging ? 'border-accent bg-gray-100' : 'border-gray-300'
                }`}
            >
                <input
                    type="file"
                    name="image"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="block text-center cursor-pointer"
                >
                    {selectedFile ? (
                        <p className="text-green-600">
                            Selected File: {selectedFile.name}
                        </p>
                    ) : (
                        <p className="text-wrap">
                            Drag and drop a file here or click to select
                        </p>
                    )}
                </label>
            </div>
            {selectedFile !== null && (
                <button
                    onClick={handleSendPhoto}
                    className="mb-4 bg-accent text-white py-2 px-4 rounded hover:bg-accent-hover transition"
                >
                    Set profile image
                </button>
            )}
        </>
    );
};

export default PhotoDrop;
