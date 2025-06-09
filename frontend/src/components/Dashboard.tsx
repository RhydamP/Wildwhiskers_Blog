import { useState, useEffect } from "react";
import CreateBlogModal from "./createBlogModel";
import "../styles/global.css";

interface Blog {
  id: string;
  title: string;
  author: string;
  description: string;
  content?: string;
  images: string[];
  pubDate: string;
  popular: boolean;
}

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backendurl = import.meta.env.VITE_BACKEND_URL;


  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendurl}/api/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogCreated = (newBlog: Blog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendurl}/api/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  }

  return (
    <section className="min-h-screen bg-gray-950 text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 ">
          <button onClick={handleLogout} className="focus:outline-none cursor-pointer flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M14 7v2h3.59l-4.3 4.29 1.41 1.41 4.3-4.29V14H14v2h6v-9h-6zm-2 10H5V7h7V5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h7v-2z" />
            </svg>
            <span className="text-sm">Logout</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-white">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center w-full md:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Create New Blog
          </button>
        </div>
        {showModal && (
          <CreateBlogModal onClose={() => setShowModal(false)} onBlogCreated={handleBlogCreated} />
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 p-4 rounded-lg text-center">
            <p className="text-red-400">{error}</p>
            <button onClick={fetchBlogs} className="mt-2 text-sm text-blue-400 hover:text-blue-300">
              Try again
            </button>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-gray-800/70 backdrop-blur p-6 rounded-xl shadow-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-xl"
              >
                {blog.images && blog.images.length > 0 && (
                  <div className="mb-4 h-48 rounded-lg overflow-hidden">
                    <img
                      src={blog.images[0]}
                      alt={blog.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl md:text-2xl font-semibold line-clamp-2 text-blue-100">
                    {blog.title}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-full transition-colors"
                      title="Delete blog"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {blog.description && (
                  <p className="text-gray-300 line-clamp-3 mb-3 text-sm">{blog.description}</p>
                )}
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{new Date(blog.pubDate).toLocaleDateString()}</span>
                  {blog.popular && (
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="text-gray-400 text-lg mb-6">No blogs available</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
            >
              Create your first blog
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
