import React, { useState, useEffect } from 'react';

const VerifyBlog = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      // You can handle the image upload logic here
      console.log("Image ready for verification:", image);
      handleCloseDialog();
    } else {
      alert("Please select an image to verify.");
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

              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Verify
                </button>
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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
