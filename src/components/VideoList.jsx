import { useEffect, useState } from "react";
import axios from "axios";
import { Play, Eye } from "lucide-react";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/api/v1/videos");

      console.log("API RESPONSE:", res.data);

      let videoData = [];

      // ✅ हर possible backend structure handle
      if (Array.isArray(res.data)) {
        videoData = res.data;
      } else if (Array.isArray(res.data?.data)) {
        videoData = res.data.data;
      } else if (Array.isArray(res.data?.data?.videos)) {
        videoData = res.data.data.videos;
      } else if (Array.isArray(res.data?.videos)) {
        videoData = res.data.videos;
      } else {
        throw new Error("Invalid video format from server");
      }

      setVideos(videoData);
    } catch (err) {
      console.log("FULL ERROR:", err);

      let message = "Failed to load videos";

      // ✅ JSON error
      if (err.response?.data && typeof err.response.data === "object") {
        message = err.response.data.message || message;
      }

      // ✅ HTML error (important)
      else if (typeof err.response?.data === "string") {
        message = "Server error (HTML response)";
      }

      // ✅ fallback
      else if (err.message) {
        message = err.message;
      }

      setError(message);
      setVideos([]); // crash avoid
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-green-400">
        Loading videos...
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="text-center text-red-400 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-bold text-green-400 mb-4">
        Latest Videos
      </h2>

      {/* Empty state */}
      {videos.length === 0 ? (
        <p className="text-gray-400">No videos found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-black border border-green-500/10 rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition"
            >
              {/* Thumbnail */}
              <div className="relative group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-44 object-cover"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <Play className="text-green-400" size={40} />
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-white font-medium text-sm line-clamp-2">
                  {video.title}
                </h3>

                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {video.views || 0}
                  </span>

                  <span>
                    {video.owner?.username || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;