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


  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blogs.length) return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <p className="text-white/70 text-lg font-medium mb-2">No blogs found</p>
      <p className="text-white/50 text-sm">Check back later for new content</p>
    </div>
  );
  const latestBlog = blogs[0];
  const nextTwoBlogs = blogs.slice(1, 3);
  const popularBlog = blogs.find((blog: any) => blog.popular) || blogs[0];

  return (
    <div className="flex flex-col items-center w-full bg-[#090d1f]">
      {/* Recent Blog Posts */}
      {/* <div className="flex flex-col md:flex-row justify-center md:justify-center gap-8 w-full py-8">
        <iframe width="853" height="480" src="https://www.youtube.com/embed/iEjfeNf5clg" title="TURTLE AVAILABLE IN INDIA / KARNATAKA AQUARIUM" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div> */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full py-8">
        <div className="w-full max-w-[1280px] px-8">
          <h2 className="text-white text-2xl font-semibold">Recent Blog Posts</h2>
          <div className="flex flex-col md:flex-row gap-8 mt-6">

            {/* Latest Blog (2/3 width on large screens) */}
            <div className="flex flex-col gap-4 w-full md:w-2/3">
              <img
                src={latestBlog.images[0]}
                alt={latestBlog.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-[#6941c6] text-sm font-semibold">{new Date(latestBlog.pubDate).toDateString()}</h3>
              <h2 className="text-white text-2xl font-semibold">{latestBlog.title}</h2>
              <p className="text-[#c0c5d0]">{latestBlog.description}</p>
              <div className="flex gap-2 flex-wrap">
                {JSON.parse(latestBlog.tags).map((tag: any, index: any) => (
                  <span key={index} className="px-2 py-1 rounded-full bg-[#f9f5ff] text-[#6941c6] text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Next Two Blogs (1/3 width on large screens, full width on small screens) */}
            <div className="flex flex-col gap-6 w-full md:w-1/3">
              {nextTwoBlogs.map((blog: any) => (
                <div key={blog.id} className="flex gap-4 items-center">
                  <img
                    src={blog.images[0]}
                    alt={blog.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-[#6941c6] text-sm font-semibold">{new Date(blog.pubDate).toDateString()}</h3>
                    <h2 className="text-white text-lg font-semibold">{blog.title}</h2>
                    <p className="text-[#c0c5d0] line-clamp-2">{blog.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>


      {/* Grid System Section - Popular Blog */}
      <div className="flex flex-col items-center w-full py-8 bg-[#090d1f]">
        <div className="w-full max-w-[1280px] px-8">
          <h2 className="text-white text-2xl font-semibold">Popular Blogs</h2>
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <img
              src={popularBlog.images[0]}
              alt={popularBlog.title}
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <h3 className="text-[#6941c6] text-sm font-semibold">{new Date(popularBlog.pubDate).toDateString()}</h3>
              <h2 className="text-white text-2xl font-semibold">{popularBlog.title}</h2>
              <p className="text-[#c0c5d0]">{popularBlog.description}</p>
              <div className="flex gap-2">
                {JSON.parse(popularBlog.tags).map((tag: any, index: any) => (
                  <span key={index} className="px-2 py-1 rounded-full bg-[#f9f5ff] text-[#6941c6] text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Blog Posts */}
      <div className="flex flex-col items-center w-full py-8">
        <div className="w-full max-w-[1280px] px-8">
          <h2 className="text-white text-2xl font-semibold">All Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {blogs.map((blog: any) => (
              <div key={blog.id} className="flex flex-col gap-4">
                <img
                  src={blog.images[0]}
                  alt={blog.title}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <h3 className="text-[#6941c6] text-sm font-semibold">{new Date(blog.pubDate).toDateString()}</h3>
                <h2 className="text-white text-lg font-semibold">{blog.title}</h2>
                <p className="text-[#c0c5d0] line-clamp-3">{blog.description}</p>
                <div className="flex gap-2">
                  {JSON.parse(blog.tags).map((tag: any, index: any) => (
                    <span key={index} className="px-2 py-1 rounded-full bg-[#f9f5ff] text-[#6941c6] text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
