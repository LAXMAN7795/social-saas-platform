import { useState, useEffect } from "react";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState([]);

  // AI outputs
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [prediction, setPrediction] = useState("");
  const [optimized, setOptimized] = useState("");

  const [loading, setLoading] = useState("");

  // Scheduling
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleClock, setScheduleClock] = useState("");

  // Media
  const [mediaList, setMediaList] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const [platformList, setPlatformList] = useState([]);

  const togglePlatform = (id) => {
    setPlatforms((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  // Fetch media
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const res = await fetch("http://127.0.0.1:8000/media/");
    const data = await res.json();
    setMediaList(data);
  };
  useEffect(() => {
    fetchMedia();
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    const res = await fetch("http://127.0.0.1:8000/posts/platforms");
    const data = await res.json();
    setPlatformList(data);
  };

  const callAPI = async (endpoint, setter, label) => {
    setLoading(label);

    try {
      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
      });

      const data = await res.json();
      setter(data.result || "No response");
    } catch {
      setter("Error ❌");
    }

    setLoading("");
  };
  const handleSubmit = async () => {
    const formattedTime =
      scheduleDate && scheduleClock
        ? `${scheduleDate}T${scheduleClock}`
        : null;

    // ✅ DEBUG 1
    console.log("CONTENT:", content);
    console.log("PLATFORMS SELECTED:", platforms);
    console.log("MEDIA:", selectedMedia);

    const res = await fetch("http://127.0.0.1:8000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        platforms,
        scheduled_at: formattedTime,
        media_id: selectedMedia?.id || null
      })
    });

    const data = await res.json();

    // ✅ DEBUG 2
    console.log("API RESPONSE:", data);

    alert("Post Created ✅");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Create Post
        </h2>
        <p className="text-sm text-gray-500">
          Create and optimize your content using AI tools
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT PANEL */}
        <div className="space-y-6">

          {/* CONTENT */}
          <Card title="Content">
            <textarea
              placeholder="Start writing your post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 p-4 border border-gray-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </Card>

          {/* MEDIA SELECT */}
          <Card title="Select Media">
            <div className="grid grid-cols-4 gap-3">
              {mediaList.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMedia(m)}
                  className={`cursor-pointer border rounded-lg overflow-hidden ${
                    selectedMedia?.id === m.id
                      ? "ring-2 ring-indigo-500"
                      : "hover:border-gray-400"
                  }`}
                >
                  {m.type.startsWith("image") ? (
                    <img
                      src={`http://127.0.0.1:8000/${m.file_url}`}
                      className="h-20 w-full object-cover"
                    />
                  ) : (
                    <div className="h-20 flex items-center justify-center text-xs bg-gray-100">
                      📄 File
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* ✅ PREVIEW */}
          {selectedMedia && (
            <Card title="Preview">
              {selectedMedia.type.startsWith("image") ? (
                <img
                  src={`http://127.0.0.1:8000/${selectedMedia.file_url}`}
                  className="w-full max-h-64 object-contain rounded"
                />
              ) : (
                <div className="text-sm">
                  📄 File selected —{" "}
                  <a
                    href={`http://127.0.0.1:8000/${selectedMedia.file_url}`}
                    target="_blank"
                    className="text-indigo-600 underline"
                  >
                    Open
                  </a>
                </div>
              )}
            </Card>
          )}

          {/* PLATFORMS */}
          <Card title="Platforms">
            <div className="flex flex-wrap gap-3">
          {platformList.map((p) => (
            <button
              key={p.id}
              onClick={() => togglePlatform(p.id)}
              className={`
                px-4 py-2 rounded-lg text-sm border transition
                ${
                  platforms.includes(p.id)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }
              `}
            >
              {p.name}
            </button>
          ))}
        </div>
          </Card>

          {/* SCHEDULE */}
          <Card title="Schedule (Optional)">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="border p-3 rounded-lg"
              />
              <input
                type="time"
                value={scheduleClock}
                onChange={(e) => setScheduleClock(e.target.value)}
                className="border p-3 rounded-lg"
              />
            </div>
          </Card>

          {/* AI TOOLS */}
          <Card title="AI Tools">
            <div className="grid grid-cols-2 gap-3">
              <Btn onClick={() => callAPI("/posts/generate-caption", setCaption, "caption")} label="Caption 🤖" />
              <Btn onClick={() => callAPI("/posts/generate-hashtags", setHashtags, "hashtags")} label="Hashtags #" />
              <Btn onClick={() => callAPI("/posts/best-time", setBestTime, "time")} label="Best Time ⏰" />
              <Btn onClick={() => callAPI("/posts/predict", setPrediction, "predict")} label="Predict 📊" />
              <Btn onClick={() => callAPI("/posts/optimize", setOptimized, "optimize")} label="Optimize ✨" />
            </div>
          </Card>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Publish / Schedule Post
          </button>

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">
          <Result title="AI Caption" loading={loading === "caption"} data={caption} />
          <Result title="Hashtags" loading={loading === "hashtags"} data={hashtags} />
          <Result title="Best Time" loading={loading === "time"} data={bestTime} />

          <Card title="Engagement">
            {prediction ? (
              <span className="px-3 py-1 bg-green-500 text-white rounded">
                {prediction}
              </span>
            ) : (
              <p className="text-gray-400">No data</p>
            )}
          </Card>

          <Result title="Optimized Content" loading={loading === "optimize"} data={optimized} />
        </div>

      </div>
    </div>
  );
}


// UI Components
function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <p className="text-sm text-gray-500 mb-3">{title}</p>
      {children}
    </div>
  );
}

function Result({ title, loading, data }) {
  return (
    <Card title={title}>
      {loading ? <p>Loading...</p> : <p>{data || "No data"}</p>}
    </Card>
  );
}

function Btn({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="border p-3 rounded-lg hover:bg-gray-100"
    >
      {label}
    </button>
  );
}