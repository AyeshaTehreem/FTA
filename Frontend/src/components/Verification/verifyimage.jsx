import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls

const VerifyBlog = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false); // For upload status

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      // Prepare form data to send the image to the server
      const formData = new FormData();
      formData.append('imageUrl', image);

      try {
        setUploading(true);
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // If you're using cookies for authentication
        });

        if (response.status === 201) {
          alert('Image uploaded successfully for verification.');
          console.log('Verification data:', response.data);
          handleCloseDialog();
        } else {
          alert('Error: Unable to upload image.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error: Failed to upload image.');
      } finally {
        setUploading(false);
      }
    } else {
      alert('Please select an image to verify.');
    }
  };

  useEffect(() => {
    // Automatically open the dialog when the component mounts
    setOpen(true);
  }, []);

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-red-600 mb-4">Add Image for Verification</h2>
            
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-red-500 file:text-white hover:file:bg-red-600"
              />
              {uploading && <p className="mt-2 text-gray-600">Uploading image...</p>}

              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={uploading}
                >
                  {uploading ? 'Verifying...' : 'Verify'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  disabled={uploading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyBlog;
