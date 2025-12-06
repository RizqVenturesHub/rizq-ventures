import React, { useRef } from 'react';
import { ImageUp, X, FileText } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
  placeholder?: string;
  error?: string;
  onError?: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onFileChange,
  acceptedTypes = '.pdf,.doc,.docx',
  maxSizeMB = 5,
  placeholder = 'PDF, DOC up to 5 MB',
  error = '',
  onError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'video/mp4',
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      onError?.('Please upload a valid file type');
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      onError?.(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    onError?.('');
    onFileChange(selectedFile);
  };

  const handleFileRemove = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileUpload}
        className="hidden"
      />
      <div className="flex items-center justify-between border-b border-gray-300 pb-2 h-10">
        {file ? (
          <div className="flex items-center gap-2 flex-1">
            <FileText className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-xs text-gray-700 truncate flex-1">
              {file.name}
            </span>
            <button
              type="button"
              onClick={handleFileRemove}
              className="text-red-500 hover:text-red-700 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <span className="text-xs text-gray-400">{placeholder}</span>
            <button
              type="button"
              onClick={handleFileButtonClick}
              className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary-light flex-shrink-0"
            >
              <ImageUp className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
