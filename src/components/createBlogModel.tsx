import { useState, useRef } from "react";

interface Blog {
  id: string;
  title: string;
  author: string;
  description: string;
  tags?: string[];
  images: string[];
  pubDate: string;
  popular: boolean;
}

interface CreateBlogModalProps {
  onClose: () => void;
  onBlogCreated: (blog: Blog) => void;
}

export default function CreateBlogModal({ onClose, onBlogCreated }: CreateBlogModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [pubDate, setPubDate] = useState("");
  const [popular, setPopular] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  // Add these new handler functions
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  const handleAddImageField = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImageFiles = [...imageFiles];
    const newImagePreviewUrls = [...imagePreviewUrls];
    newImageFiles.splice(index, 1);
    newImagePreviewUrls.splice(index, 1);
    setImageFiles(newImageFiles);
    setImagePreviewUrls(newImagePreviewUrls);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (imageFiles.length + files.length > 5) {
      alert("Maximum of 5 images allowed");
      return;
    }

    const newImageFiles = [...imageFiles];
    const newImagePreviewUrls = [...imagePreviewUrls];

    Array.from(files).forEach(file => {
      if (!file.type.match("image.*")) {
        alert("Only image files are allowed");
        return;
      }
      newImageFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviewUrls.push(reader.result as string);
        setImagePreviewUrls([...newImagePreviewUrls]);
      };
      reader.readAsDataURL(file);
    });

    setImageFiles(newImageFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreateBlog = async () => {
    if (!title.trim()) return alert("Title cannot be empty");
    if (!description.trim()) return alert("Description cannot be empty");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("description", description);
      formData.append("tags", JSON.stringify(tags));
      formData.append("pubDate", pubDate || new Date().toISOString().split("T")[0]);
      formData.append("popular", popular.toString());

      imageFiles.forEach(file => {
        formData.append("images", file);
      });

      const res = await fetch(`${backendurl}/api/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create blog");

      const newBlog = await res.json();
      onBlogCreated(newBlog);
      onClose();
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4">
      <div className="bg-gray-900 text-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Create Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-300">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-1 text-gray-300">
                Author
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter blog author"
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-300">
                Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter blog description"
                rows={3}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
          <div className="space-y-4">
            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-1 text-gray-300">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <div key={index} className="bg-blue-600 px-3 py-1 rounded-full flex items-center">
                    <span className="text-sm mr-1">{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-white hover:text-gray-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                  onBlur={addTag}
                  placeholder="Enter tags (comma separated)"
                  className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Press Enter or comma to add tags</p>
            </div>
            {/* Images */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-300">
                  Images (up to 5)
                </label>
                {imageFiles.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddImageField}
                    className="text-sm text-blue-400 hover:text-blue-300 transition"
                  >
                    + Add image
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                multiple
              />
              {imageFiles.length === 0 ? (
                <div
                  onClick={handleAddImageField}
                  className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mx-auto text-gray-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-400">Click to upload images</p>
                  <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {imagePreviewUrls.map((previewUrl, index) => (
                    <div key={index} className="relative group">
                      <div className="h-32 rounded-lg overflow-hidden border border-gray-700">
                        <img
                          src={previewUrl}
                          alt={`Image preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {imageFiles[index].name}
                      </p>
                    </div>
                  ))}
                  {imageFiles.length < 5 && (
                    <div
                      onClick={handleAddImageField}
                      className="h-32 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mx-auto text-gray-500 mb-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span className="text-xs text-gray-500">Add more</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Publication Date and Popular */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pubDate" className="block text-sm font-medium mb-1 text-gray-300">
                  Publication Date
                </label>
                <input
                  id="pubDate"
                  type="date"
                  value={pubDate}
                  onChange={(e) => setPubDate(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="flex items-center h-full pt-6">
                <input
                  id="popular"
                  type="checkbox"
                  checked={popular}
                  onChange={(e) => setPopular(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="popular" className="ml-2 text-sm font-medium text-gray-300">
                  Mark as popular
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateBlog}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors duration-200 disabled:opacity-50 font-medium flex items-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Create Blog"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
