import React from 'react';
import ShareIcon from "../../icons/shareIcon";
import { FileText, MessageSquare, Video, MoreVertical, ExternalLink } from 'lucide-react';

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  description?: string;
  dateAdded?: string;
  tags?: string[];
}

function ContentCard({ title, link, type, description, dateAdded = "Today", tags = [] }: CardProps) {
  // Function to get appropriate icon based on content type
  const getTypeIcon = () => {
    switch (type) {
      case "twitter":
        return <MessageSquare size={16} className="text-blue-500" />;
      case "youtube":
        return <Video size={16} className="text-red-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
    }
  };

  // Function to render the appropriate content embed
  const renderContent = () => {
    if (type === "youtube") {
      return (
        <div className="aspect-video w-full bg-gray-100 rounded-md overflow-hidden mb-3">
          <iframe 
            className="w-full h-full" 
            src={link.includes('embed') ? link : `https://www.youtube.com/embed/${link.split('v=')[1] || link}`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      );
    } else if (type === "twitter") {
      return (
        // <div className="border border-gray-200 rounded-md p-3 mb-3 bg-gray-50">
        //   <div className="flex items-center mb-2">
        //     <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        //     <div className="ml-2">
        //       <div className="font-medium text-sm">Twitter User</div>
        //       <div className="text-gray-500 text-xs">@username</div>
        //     </div>
        //   </div>
        //   <p className="text-sm text-gray-700 mb-2">{description || "This is the tweet content that would appear here. Click to view the full tweet."}</p>
        //   <a 
        //     href={link} 
        //     target="_blank" 
        //     rel="noopener noreferrer"
        //     className="text-blue-500 text-xs flex items-center hover:underline"
        //   >
        //     View on Twitter
        //     <ExternalLink size={12} className="ml-1" />
        //   </a>
        // </div>
        <div className="border border-gray-200 rounded-md p-3 mb-3 bg-gray-50">
        <blockquote className="twitter-tweet">
          <a href={link.replace("x.com", "twitter.com")}></a>
        </blockquote>
      </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden max-w-sm">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <h3 className="font-medium text-gray-800 text-sm">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ShareIcon />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <MoreVertical size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        {renderContent()}
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Date */}
        <div className="text-xs text-gray-400">
          Added on {dateAdded}
        </div>
      </div>
    </div>
  );
}

export default ContentCard;