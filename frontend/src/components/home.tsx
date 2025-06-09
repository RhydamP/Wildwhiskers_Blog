import React, { useEffect, useState } from "react";
import "../styles/global.css";

const Home = () => {
  const [blogs, setBlogs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendurl}/api/blogs`);
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

    fetchBlogs();
  }, []);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200/20"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-purple-400 absolute top-0"></div>
          <div className="animate-pulse absolute inset-2 rounded-full bg-purple-400/10"></div>
        </div>
        <div className="text-center">
          <h2 className="text-white text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Loading Amazing Content
          </h2>
          <p className="text-purple-200 text-sm font-medium">Preparing something beautiful for you...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center p-8 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
        <p className="text-red-400 text-lg font-semibold">{error}</p>
      </div>
    </div>
  );

  if (!blogs.length) return (
    <div className="flex flex-col items-center justify-center py-24 px-4 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 flex items-center justify-center">
          <svg className="w-12 h-12 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-white text-2xl font-bold mb-3">No Blogs Found</h3>
        <p className="text-slate-400 text-lg">Check back later for amazing new content</p>
      </div>
    </div>
  );

  const latestBlog = blogs[0];
  const nextTwoBlogs = blogs.slice(1, 3);
  const popularBlog = blogs.find((blog: any) => blog.popular) || blogs[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Recent Blog Posts */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full py-16">
          <div className="w-full max-w-[1280px] px-8">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4">
                Recent Blog Posts
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 mt-8">
              {/* Latest Blog (2/3 width on large screens) */}
              <div className="flex flex-col gap-6 w-full md:w-2/3 group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={latestBlog.images[0]}
                    alt={latestBlog.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 rounded-full bg-purple-500/90 backdrop-blur-sm text-white text-sm font-medium">
                      Latest
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-purple-400 text-sm font-semibold tracking-wide uppercase">
                    {new Date(latestBlog.pubDate).toDateString()}
                  </p>
                  <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                    {latestBlog.title}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed">{latestBlog.description}</p>
                  <div className="flex gap-3 flex-wrap pt-2">
                    {JSON.parse(latestBlog.tags).map((tag: any, index: any) => (
                      <span key={index} className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 text-sm font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Two Blogs (1/3 width on large screens) */}
              <div className="flex flex-col gap-8 w-full md:w-1/3">
                {nextTwoBlogs.map((blog: any) => (
                  <div key={blog.id} className="group cursor-pointer">
                    <div className="flex gap-5 items-start p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                      <div className="relative overflow-hidden rounded-xl flex-shrink-0">
                        <img
                          src={blog.images[0]}
                          alt={blog.title}
                          className="w-20 h-20 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col space-y-2 min-w-0">
                        <p className="text-purple-400 text-xs font-semibold tracking-wide uppercase">
                          {new Date(blog.pubDate).toDateString()}
                        </p>
                        <h3 className="text-white text-lg font-bold leading-tight group-hover:text-purple-300 transition-colors duration-300">
                          {blog.title}
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{blog.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Blog Section */}
        <div className="flex flex-col items-center w-full py-16 bg-slate-800/30 backdrop-blur-sm">
          <div className="w-full max-w-[1280px] px-8">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent mb-4">
                Popular Blogs
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
            </div>

            <div className="group cursor-pointer">
              <div className="flex flex-col md:flex-row gap-10 p-8 rounded-3xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10">
                <div className="relative overflow-hidden rounded-2xl w-full md:w-1/2">
                  <img
                    src={popularBlog.images[0]}
                    alt={popularBlog.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 rounded-full bg-pink-500/90 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                      Popular
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6 w-full md:w-1/2 justify-center">
                  <p className="text-pink-400 text-sm font-semibold tracking-wide uppercase">
                    {new Date(popularBlog.pubDate).toDateString()}
                  </p>
                  <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight group-hover:text-pink-300 transition-colors duration-300">
                    {popularBlog.title}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed">{popularBlog.description}</p>
                  <div className="flex gap-3 flex-wrap">
                    {JSON.parse(popularBlog.tags).map((tag: any, index: any) => (
                      <span key={index} className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 text-pink-300 text-sm font-medium hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Blog Posts */}
        <div className="flex flex-col items-center w-full py-16">
          <div className="w-full max-w-[1280px] px-8">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-4">
                All Blog Posts
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {blogs.map((blog: any, index: number) => (
                <div key={blog.id} className="group cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex flex-col h-full rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 hover:border-blue-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.images[0]}
                        alt={blog.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="flex flex-col gap-4 p-6 flex-grow">
                      <p className="text-blue-400 text-xs font-semibold tracking-wide uppercase">
                        {new Date(blog.pubDate).toDateString()}
                      </p>
                      <h3 className="text-white text-xl font-bold leading-tight group-hover:text-blue-300 transition-colors duration-300">
                        {blog.title}
                      </h3>
                      <p className="text-slate-400 line-clamp-3 leading-relaxed flex-grow">{blog.description}</p>
                      <div className="flex gap-2 flex-wrap mt-auto">
                        {JSON.parse(blog.tags).slice(0, 3).map((tag: any, tagIndex: any) => (
                          <span key={tagIndex} className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300 text-xs font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                            {tag}
                          </span>
                        ))}
                        {JSON.parse(blog.tags).length > 3 && (
                          <span className="px-3 py-1 rounded-full bg-slate-600/50 text-slate-300 text-xs font-medium">
                            +{JSON.parse(blog.tags).length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;