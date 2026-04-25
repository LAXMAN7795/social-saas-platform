import { useEffect, useState } from "react";
import { BASE_URL } from "../api";

export default function Media() {
  const [files, setFiles] = useState([]);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const res = await fetch(`${BASE_URL}/media/`);
    const data = await res.json();
    setMedia(data);
  };

  const upload = async () => {
  if (!files) {
    alert("Select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", files);

  // DEBUG
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  const res = await fetch(`${BASE_URL}/media/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  console.log(data);

  fetchMedia();
};

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      <h2 className="text-2xl font-semibold">Media Library</h2>

      {/* Upload */}
      <div className="flex gap-3">
        <input
            type="file"
            onChange={(e) => {
                console.log("Selected:", e.target.files[0]);
                setFiles(e.target.files[0]);
            }}
            />
        <button
          onClick={upload}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Upload
        </button>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-4 gap-4">
        {media.map((m) => (
          <div key={m.id} className="border p-2 rounded-lg">
            {m.type.startsWith("image") ? (
            <img
                src={`${BASE_URL}/${m.file_url}`}
                className="w-full h-32 object-cover rounded"
            />
            ) : (
            <div className="flex flex-col items-center justify-center h-32 bg-gray-100 rounded text-sm text-gray-600">
                📄 File
                <a
                href={`${BASE_URL}/${m.file_url}`}
                target="_blank"
                className="text-indigo-600 underline mt-1"
                >
                Open
                </a>
            </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}