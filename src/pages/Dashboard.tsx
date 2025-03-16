import React, { useEffect, useState } from 'react';
import { Book, Share, FileText, Tag, Link as LinkIcon, Video, MessageSquare, Plus, File } from 'lucide-react';
import AddContentModal from '../components/ui/AddContent';
import axios from 'axios';
import ContentCard from '../components/ui/card';

// SidebarItem Component
const SidebarItem = ({ icon, label, isActive = false, onClick }) => {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
        isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className={`text-lg ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className={`text-sm ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`}>
        {label}
      </span>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ title = "Second Brain", onSelectItem, selectedItemKey }) => {
  const sidebarItems = [
    { key: 'tweets', label: 'Tweets', icon: <MessageSquare size={20} /> },
    { key: 'videos', label: 'Videos', icon: <Video size={20} /> },
    { key: 'documents', label: 'Documents', icon: <FileText size={20} /> },
    { key: 'links', label: 'Links', icon: <LinkIcon size={20} /> },
    { key: 'tags', label: 'Tags', icon: <Tag size={20} /> },
  ];

  const [internalSelectedKey, setInternalSelectedKey] = useState('tweets');
  const activeItemKey = selectedItemKey !== undefined ? selectedItemKey : internalSelectedKey;

  const handleItemClick = (itemKey) => {
    if (selectedItemKey === undefined) {
      setInternalSelectedKey(itemKey);
    }
    
    if (onSelectItem) {
      onSelectItem(itemKey);
    }
  };

  return (
    <div className="w-64 h-300 bg-white rounded-lg shadow-sm p-3 flex flex-col height-screen overflow-hidden">
      <div className="flex items-center gap-2 ml-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
          <Book size={14} className="text-purple-600" />
        </div>
        <h1 className="text-lg font-medium text-gray-800">{title}</h1>
      </div>
      
      <div className="flex flex-col gap-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            isActive={activeItemKey === item.key}
            onClick={() => handleItemClick(item.key)}
          />
        ))}
      </div>
    </div>
  );
};

// Full Second Brain App Demo
const Dashboard = () => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('documents');
  const [ismodalOpen, setIsmodalOpen] = useState(false);
  const [content, setContent] = useState([]);


const getContent = async () => {
  try {
  const token = localStorage.getItem('token');
  if(!token){
    alert("Please login to continue");
  }
    const res = await axios.get("http://192.168.31.111:8000/api/v1/content", {
      headers: {
        "Content-Type": "application/json", // Ensure JSON format
        Authorization: `${token}`, // If authentication is required
      },
    });
  console.log(res.data);
  setContent(res?.data?.content);
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    getContent();
  },[])
  
  const notes = [
    {
      id: 1,
      title: "Project Ideas",
      content: "• Build a knowledge base\n• Create a habit tracker\n• Design a minimalist todo app",
      category: "Productivity",
      tags: ["productivity", "ideas"],
      dateAdded: "03/05/2024",
      type: "list"
    },
    {
      id: 2,
      title: "How to Build a Second Brain",
      content: "",
      category: "Productivity",
      tags: ["productivity", "learning"],
      dateAdded: "04/01/2024",
      type: "document"
    },
    {
      id: 3,
      title: "Productivity Tip",
      content: "The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.",
      category: "Productivity",
      tags: ["productivity", "learning"],
      dateAdded: "05/02/2024",
      type: "note"
    }
  ];

  return (
    <div className="flex bg-gray-100 p-4 rounded-lg h-screen overflow-hidden">
      {/* Left sidebar with label */}
      <div className="flex flex-col mr-4">
        <Sidebar 
          selectedItemKey={selectedSidebarItem} 
          onSelectItem={setSelectedSidebarItem} 
        />
      </div>
      
      {/* Main content */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-800">All Notes</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-100 text-purple-700 text-sm">
              <Share size={16} />
              <span>Share Brain</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-600 text-white text-sm" onClick={() => setIsmodalOpen(true)}>
              <Plus size={16} />
              <span>Add Content</span>
            </button>
          </div>
        </div>
        
        {/* Notes grid */}
        <div className="grid grid-cols-3 gap-4">
          {content.map((note, index) => (
            <ContentCard key={index} title={note.title} link={note.link} type={note.type} description={note.description} dateAdded={note.dateAdded} tags={note.tags} />
          ))}
        </div>
      </div>
      <AddContentModal isOpen={ismodalOpen} onClose={() => setIsmodalOpen(false)} />
    </div>
  );
};

export default Dashboard;