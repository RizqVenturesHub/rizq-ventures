// components/CreatePostModal.tsx
import React from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNormalPost: () => void;
  onSelectJobPost: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSelectNormalPost,
  onSelectJobPost,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm px-8 py-6 relative"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-center text-lg font-bold text-primary mb-6">
          Post Type
        </h2>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onSelectNormalPost}
            className="px-6 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-800 hover:bg-primary-light3 transition-colors"
          >
            Normal Post
          </button>

          <button
            type="button"
            onClick={onSelectJobPost}
            className="px-6 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-800 hover:bg-primary-light3 transition-colors"
          >
            Job Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
