/* eslint-disable @typescript-eslint/ban-ts-comment */
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";

const Profile = () => {

  const [email, setEmail] = useState<string>("");
  const [isEmailActivated, setIsEmailActivated] = useState<boolean>(false);
  const [roles, setRoles] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState<boolean>(false); 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserService.getProfile();
        setEmail(response.data.email || "Unknown email");
        setIsEmailActivated(response.data.isActivated);
        setRoles(response.data.roles)
      } catch (error) {
        console.log('error', error)
        setError("Error fetching profile information.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleActivateEmail = async () => {
    try {
      const response = await UserService.activateEmail(); 
      if (response.status === 200) {
        setIsEmailActivated(true); 
      }
    } catch (error) {
      console.log('first', error)
      setError("Error activating email.");
    }
  };

  const handleSendPhoto = async () => {
    try{
      if(selectedFile == null){ throw Error('file not selected') }
      const response = await UserService.uploadPhoto(selectedFile)
      console.log(response)
    } catch(error){
      setError('Error while uploading photo...')
      console.log(error)
    }
  }

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div className="flex justify-center items-center h-full bg-background">
        <div className="bg-background-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mb-4 p-4 border-2 border-dashed rounded-lg size-40 ${
              dragging ? "border-accent bg-gray-100" : "border-gray-300"
            }`}
          >
            <input type="file" name="file" accept=".png,.jpg,.jpeg" 
            onChange={handleFileChange} 

            className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="block text-center cursor-pointer">
              {selectedFile ? (
                <p className="text-green-600">Selected File: {selectedFile.name}</p>
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

            <div className="mb-4">
              <p className="text-lg">
                <strong>Email:</strong> {email}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-lg">
                <strong>Roles:</strong> {roles.join(' ')}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-lg">
                <strong>Email Activated:</strong> {isEmailActivated ? "Yes" : "No"}
              </p>
            </div>

            {!isEmailActivated && (
              <button
                onClick={handleActivateEmail}
                className="bg-accent text-white py-2 px-4 rounded hover:bg-accent-hover transition"
              >
                Activate Email
              </button>
            )}
          </div>
        </div>
      </div>
  );
};

export default Profile;
