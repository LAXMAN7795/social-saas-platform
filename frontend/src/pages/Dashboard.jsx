import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecent();
  }, []);

  const fetchStats = async () => {
    const res = await fetch("http://127.0.0.1:8000/posts/stats");
    const data = await res.json();
    setStats(data);
  };

  const fetchRecent = async () => {
    const res = await fetch("http://127.0.0.1:8000/posts/recent");
    const data = await res.json();
    setRecent(data);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of your activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6">

        <StatCard title="Total Posts" value={stats.total} />
        <StatCard title="Scheduled" value={stats.scheduled} />
        <StatCard title="Published" value={stats.published} />
        <StatCard title="Draft" value={stats.draft} />

      </div>

      {/* RECENT POSTS */}
      <div className="bg-white border rounded-xl shadow-sm">

        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-800">
            Recent Posts
          </h3>
        </div>

        {recent.length === 0 ? (
          <div className="p-6 text-gray-400 text-sm">
            No posts yet
          </div>
        ) : (
          recent.map((post) => (
            <div
              key={post.id}
              className="grid grid-cols-4 gap-4 px-6 py-4 border-b items-center hover:bg-gray-50"
            >

              {/* MEDIA */}
              <div>
                {post.media_url ? (
                  post.media_type?.startsWith("image") ? (
                    <img
                      src={`http://127.0.0.1:8000/${post.media_url}`}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  ) : (
                    <span className="text-xs text-indigo-600">
                      File
                    </span>
                  )
                ) : (
                  <span className="text-gray-300 text-xs">
                    No Media
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <p className="truncate text-gray-800">
                {post.content}
              </p>

              {/* STATUS */}
              <StatusBadge status={post.status} />

              {/* TIME */}
              <p className="text-gray-400 text-xs">
                {formatTime(post.scheduled_at)}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}


// ---------------- UI COMPONENTS ----------------

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold text-gray-900 mt-2">
        {value || 0}
      </h2>
    </div>
  );
}


function StatusBadge({ status }) {
  const styles = {
    scheduled: "bg-yellow-100 text-yellow-700",
    posted: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-600"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}


function formatTime(time) {
  if (!time) return "Now";

  const date = new Date(time);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}