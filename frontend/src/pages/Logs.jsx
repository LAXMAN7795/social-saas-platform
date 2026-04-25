import { useEffect, useState } from "react";
import { BASE_URL } from "../api";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await fetch(`${BASE_URL}/posts/logs`);
    const data = await res.json();
    setLogs(data);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Activity Logs
        </h2>
        <p className="text-sm text-gray-500">
          Track all post activity and status
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-5 gap-4 px-6 py-3 text-xs font-semibold text-gray-400 border-b uppercase tracking-wide">
          <p>Media</p>
          <p>Content</p>
          <p>Status</p>
          <p>Time</p>
          <p>ID</p>
        </div>

        {/* BODY */}
        {logs.length === 0 ? (
          <div className="p-6 text-gray-400 text-sm">
            No logs available
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="grid grid-cols-5 gap-4 px-6 py-4 border-b items-center hover:bg-gray-50"
            >

              {/* MEDIA */}
              <div className="flex items-center">
                {log.media_url ? (
                  log.media_type?.startsWith("image") ? (
                    <img
                      src={`${BASE_URL}/${log.media_url}`}
                      className="w-14 h-14 object-cover rounded-md border"
                    />
                  ) : (
                    <a
                      href={`${BASE_URL}/${log.media_url}`}
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
                {log.content}
              </p>

              {/* STATUS */}
              <StatusBadge status={log.status} />

              {/* TIME */}
              <p className="text-gray-500 text-sm">
                {formatTime(log.time)}
              </p>

              {/* ID */}
              <p className="text-gray-400 text-xs">
                #{log.id || "-"}
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
    posted: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-600",
    failed: "bg-red-100 text-red-600"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`}>
      {status || "draft"}
    </span>
  );
}


// TIME FORMAT
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