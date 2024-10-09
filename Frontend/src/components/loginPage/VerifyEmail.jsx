import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams(); // get the token from the URL
  const [message, setMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(true); // Track verification status
  const [hasVerified, setHasVerified] = useState(false); // Track if verification has occurred

  useEffect(() => {
    const verifyEmail = async () => {
      if (!isVerifying || hasVerified) return; // Prevent multiple API calls if already verifying or has verified

      setIsVerifying(false); // Set to false immediately to prevent re-entry

      try {
        const response = await axios.get(`http://localhost:5002/auth/verify-email/${token}`);
        setMessage(response.data.message); // Display the success message
        setHasVerified(true); // Mark as verified to prevent further calls
      } catch (error) {
        setMessage(error.response?.data?.message || 'Something went wrong, please try again.');
      }
    };

    verifyEmail();
  }, [token, isVerifying, hasVerified]); // Depend on token, isVerifying, and hasVerified

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Email Verification</h1>
        <p className="text-center text-gray-600 mb-4">{message}</p>
        {message === 'Email successfully verified!' && (
          <a 
            href="/login" 
            className="block mt-4 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Go to Login
          </a>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
