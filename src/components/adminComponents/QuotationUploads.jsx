import React from 'react';
import { ExternalLink } from 'lucide-react';

const QuotationUploads = ({ files }) => {
  const openFile = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!files || files.length === 0) {
    return <p className="text-gray-500">No files attached</p>;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mt-4">
      <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">
        Attached Files
      </h3>
      <div className="space-y-3">
        {files.map((fileUrl, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onClick={() => openFile(fileUrl)}
          >
            <span className="text-gray-700 truncate mr-4">
              {`File ${index + 1}`}
            </span>
            <ExternalLink 
              className="text-blue-500 hover:text-blue-700" 
              size={20} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotationUploads;