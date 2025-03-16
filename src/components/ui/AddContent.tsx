import React, { useState } from 'react';
import { Share } from 'lucide-react';
import axios from 'axios';

const AddContentModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [error, setError] = useState('');

  const addContent = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("in the token", token);

      if (!token) {
        alert("Please login to continue");
        return; // Stop execution if no token
      }

      console.log("In the title, link, type", title, link, selectedPlatform);

      const res = await axios.post(
        "http://192.168.31.111:8000/api/v1/content/create",
        {
          title: title,
          link,
          type: selectedPlatform,
          tags: [],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Add Bearer prefix
          },
        }
      );

      console.log("✅ Response:", res.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error("❌ Error:", error.message);
      setError("Failed to add content. Please try again."); // Set error message
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Title: ${title}, Platform: ${selectedPlatform}`);
    addContent();
    setTitle('');
    setLink(''); // Clear the link state
    setSelectedPlatform('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-0">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Add Content</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter link"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Platform</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex-1 p-2 rounded-md ${selectedPlatform === 'twitter' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedPlatform('twitter')}
              >
                Twitter
              </button>
              <button
                type="button"
                className={`flex-1 p-2 rounded-md ${selectedPlatform === 'youtube' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedPlatform('youtube')}
              >
                YouTube
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Share size={16} className="mr-1" />
              Submit
            </button>
          </div>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddContentModal;