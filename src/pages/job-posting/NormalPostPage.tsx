import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FileUpload from '../../components/FileUpload';
import postEndpoints from '../../services/endpoints/postEndpoints';

const NormalPostPage: React.FC = () => {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      toast.error('Please add a title or content for the post');
      return;
    }

    try {
      if (mediaFile) {
        const fd = new FormData();
        fd.append('title', title);
        fd.append('content', content);
        if (tags) fd.append('tags', JSON.stringify(tags.split(',').map(t => t.trim())));
        fd.append('media', mediaFile);
        await postEndpoints.createPost(fd as any);
      } else {
        const payload = {
          title,
          content,
          tags: tags ? tags.split(',').map(t => t.trim()) : [],
        };
        await postEndpoints.createPost(payload);
      }

      toast.success('Post created');
      navigate('/posts');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center items-start py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-primary-light px-10 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-10">
            Create Post
          </h1>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Post Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title
              </label>
              <input
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 text-sm"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                rows={4}
                placeholder="Write your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 text-sm resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                placeholder="Add tags separated by commas"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 text-sm"
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Upload
              </label>
              <FileUpload
                file={mediaFile}
                onFileChange={setMediaFile}
                acceptedTypes=".jpg,.jpeg,.png,.mp4"
                maxSizeMB={10}
                placeholder="Upload image or video (optional)"
                error={uploadError}
                onError={setUploadError}
              />
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-11 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark1 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NormalPostPage;
