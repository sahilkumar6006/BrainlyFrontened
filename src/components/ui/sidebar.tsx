import React, { useState } from 'react';
import { Book, FileText, Tag, Link as LinkIcon, Video, MessageSquare } from 'lucide-react';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  /** Title of the sidebar */
  title?: string;
  /** Function to call when an item is selected */
  onSelectItem?: (itemKey: string) => void;
  /** Currently selected item key */
  selectedItemKey?: string;
}

// Define the sidebar items structure
interface SidebarItemData {
  key: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  title = "Second Brain",
  onSelectItem,
  selectedItemKey,
}) => {
  const sidebarItems: SidebarItemData[] = [
    { key: 'tweets', label: 'Tweets', icon: <MessageSquare size={20} /> },
    { key: 'videos', label: 'Videos', icon: <Video size={20} /> },
    { key: 'documents', label: 'Documents', icon: <FileText size={20} /> },
    { key: 'links', label: 'Links', icon: <LinkIcon size={20} /> },
    { key: 'tags', label: 'Tags', icon: <Tag size={20} /> },
  ];

  // Track selection state if not provided by parent
  const [internalSelectedKey, setInternalSelectedKey] = useState<string>('tweets');
  
  // Use either the prop or internal state
  const activeItemKey = selectedItemKey !== undefined ? selectedItemKey : internalSelectedKey;

  // Handle item selection
  const handleItemClick = (itemKey: string) => {
    if (selectedItemKey === undefined) {
      setInternalSelectedKey(itemKey);
    }
    
    if (onSelectItem) {
      onSelectItem(itemKey);
    }
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-3 flex flex-col">
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

export default Sidebar;