import { useEffect, useState } from "react";

export default function Platforms() {
  const [platforms, setPlatforms] = useState([]);
  const [connected, setConnected] = useState({});

  useEffect(() => {
    fetchPlatforms();
    fetchConnected();
  }, []);

  const fetchPlatforms = async () => {
    const res = await fetch("http://127.0.0.1:8000/posts/platforms");
    const data = await res.json();
    setPlatforms(data);
  };

  const fetchConnected = async () => {
    const res = await fetch("http://127.0.0.1:8000/posts/platforms/connected");
    const data = await res.json();
    setConnected(data);
  };

  const connect = async (id) => {
    await fetch(`http://127.0.0.1:8000/posts/platforms/connect/${id}`, {
      method: "POST"
    });
    fetchConnected();
  };

  const disconnect = async (id) => {
    await fetch(`http://127.0.0.1:8000/posts/platforms/disconnect/${id}`, {
      method: "POST"
    });
    fetchConnected();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Platform Connections
        </h2>
        <p className="text-sm text-gray-500">
          Connect your social media accounts
        </p>
      </div>

      {/* LIST */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

        {platforms.map((p) => {
          const isConnected = connected[p.id];

          return (
            <div
              key={p.id}
              className="flex justify-between items-center px-6 py-4 border-b last:border-none"
            >
              <p className="text-gray-800 font-medium">
                {p.name}
              </p>

              {isConnected ? (
                <button
                  onClick={() => disconnect(p.id)}
                  className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  Connected ✓ (Disconnect)
                </button>
              ) : (
                <button
                  onClick={() => connect(p.id)}
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Connect
                </button>
              )}
            </div>
          );
        })}

      </div>

    </div>
  );
}