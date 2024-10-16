import UserService from '@/services/UserService';
import { useState } from 'react';

const PhotoDrop = () => {
    const [dragging, setDragging] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [changePhoto, setChangePhoto] = useState<boolean>(false);
    const [photo, setPhoto] = useState<string>('');

    const handleSendPhoto = async () => {
        try {
            if (selectedFile == null) {
                throw Error('file not selected');
            }
            const response = await UserService.uploadPhoto(selectedFile);
            setPhoto(response.data.downloadURL);
            setChangePhoto(true); // Show the uploaded photo
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
            {changePhoto ? (
                <>
                    <img
                        src={photo}
                        alt="Profile photo"
                        className="rounded-full w-28 h-28 mb-4 mx-auto"
                    />
                    <button
                        onClick={() => setChangePhoto(false)} // Allows changing the photo
                        className="mb-4 mx-auto bg-accent text-white py-2 px-4 rounded hover:bg-accent-hover transition"
                    >
                        Change photo
                    </button>
                </>
            ) : (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`mb-4 p-4 border-2 border-dashed rounded-lg w-40 h-40 mx-auto ${
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
            )}
            {selectedFile && !changePhoto && (
                <button
                    onClick={handleSendPhoto}
                    className="mb-4 mx-auto bg-accent text-white py-2 px-4 rounded hover:bg-accent-hover transition"
                >
                    Set profile image
                </button>
            )}
        </>
    );
};

export default PhotoDrop;
