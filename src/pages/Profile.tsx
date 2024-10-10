/* eslint-disable @typescript-eslint/ban-ts-comment */
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";

const Profile = () => {
  const [email, setEmail] = useState<string>("");
  const [isEmailActivated, setIsEmailActivated] = useState<boolean>(false);
  const [roles, setRoles] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

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
  );
};

export default Profile;
