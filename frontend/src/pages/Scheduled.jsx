import { useEffect, useState } from "react";

export default function Scheduled() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/posts/");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Scheduled Posts
        </h2>
        <p className="text-sm text-gray-500">
          View and manage your scheduled content
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-5 px-6 py-3 text-sm font-medium text-gray-500 border-b">
          <p>Media</p>
          <p>Content</p>
          <p>Platforms</p>
          <p>Status</p>
          <p>Time</p>
        </div>

        {/* BODY */}
        {posts.length === 0 ? (
          <div className="p-6 text-gray-400 text-sm">
            No posts available
          </div>
        ) : (
          posts.map((post) => (
            <div
          key={post.id}
          className="grid grid-cols-5 gap-4 px-6 py-4 border-b items-center"
        >

          {/* MEDIA */}
          <div className="flex items-center">
            {post.media_url ? (
              post.media_type?.startsWith("image") ? (
                <img
                  src={`http://127.0.0.1:8000/${post.media_url}`}
                  className="w-14 h-14 object-cover rounded-md border"
                />
              ) : (
                <a
                  href={`http://127.0.0.1:8000/${post.media_url}`}
                  target="_blank"
                  className="text-indigo-600 text-xs underline"
                >
                  File
                </a>
              )
            ) : (
              <span className="text-gray-300 text-xs">No Media</span>
            )}
          </div>

          {/* CONTENT */}
          <p className="truncate text-gray-800">
            {post.content}
          </p>

          {/* PLATFORMS */}
          <p className="text-gray-500 text-xs">
            {post.platforms?.join(", ") || "-"}
          </p>

          {/* STATUS */}
          <StatusBadge status={post.status} />

          {/* TIME */}
          <p className="text-gray-400 text-xs">
            {post.scheduled_at || "Now"}
          </p>

        </div>
          ))
        )}

      </div>

    </div>
  );
}


// STATUS BADGE
function StatusBadge({ status }) {
  const styles = {
    scheduled: "bg-yellow-100 text-yellow-700",
    published: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-600"
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || styles.draft
      }`}
    >
      {status || "draft"}
    </span>
  );
}