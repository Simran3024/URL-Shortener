import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { code } = context.params;
  try {
    const res = await axios.get(`http://localhost:5000/stats/${code}`);
    return {
      props: { data: res.data, error: null }
    };
  } catch (err) {
    return {
      props: { data: null, error: "No stats found or invalid short code." }
    };
  }
}

export default function StatsPage({ data, error }) {
  const [showFullUrl, setShowFullUrl] = useState(false);
  const router = useRouter();

  const truncateUrl = (url) => {
    if (url.length > 60 && !showFullUrl) {
      return url.slice(0, 60) + '... ';
    }
    return url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400 px-4 relative">
      
      {/* Main White Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl p-8">
        
        {/* Header with Back Arrow on Right */}
    

<div className="flex items-center mb-8">
  <h2 className="text-3xl font-bold text-blue-700">URL Stats</h2>
</div>

       

        {error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : (
          <div className="space-y-6 text-gray-700 text-base">
            {/* Original URL */}
            <div>
              <span className="font-semibold">🔗 Original URL:</span>{' '}
              <div className="break-all whitespace-pre-wrap text-blue-600 hover:underline">
                <a href={data.longUrl} target="_blank" rel="noopener noreferrer">
                  {truncateUrl(data.longUrl)}
                </a>
              </div>
              {data.longUrl.length > 60 && (
                <button
                  onClick={() => setShowFullUrl(!showFullUrl)}
                  className="ml-2 text-blue-500 hover:underline text-sm"
                >
                  {showFullUrl ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>

            {/* Short URL */}
            <div>
              <span className="font-semibold">📎 Short URL:</span>{' '}
              <span className="text-teal-700 font-mono break-all">
                http://localhost:5000/{data.shortCode}
              </span>
            </div>

            {/* Clicks */}
            <div>
              <span className="font-semibold">👁️ Clicks:</span> {data.clicks}
            </div>

            {/* Created Date */}
            <div>
              <span className="font-semibold">📅 Created At:</span>{' '}
              {new Date(data.createdAt).toLocaleString()}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
