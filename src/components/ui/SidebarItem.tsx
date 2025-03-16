import React from 'react';

interface SidebarItemProps {
  /** The icon to display in the sidebar item */
  icon: React.ReactNode;
  /** The label text for the sidebar item */
  label: string;
  /** Whether the item is currently active/selected */
  isActive?: boolean;
  /** Function called when the item is clicked */
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
        isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
      role="button"
      aria-selected={isActive}
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

export default SidebarItem;