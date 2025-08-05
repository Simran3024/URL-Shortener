import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from 'next-auth/react';
export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/register");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setShortUrl(null);

    try {
      const response = await axios.post(
        `${API_URL}/api/shorten`,
        { longUrl },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const shortCode = response.data.shortCode;
      setShortUrl(`${API_URL}/${shortCode}`);
    } catch (err) {
      console.error("❌ ERROR:", err);
      setError(err?.response?.data?.error || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};


  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400 px-4">
      
    

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">🔗 URL Shortener</h1>
  {/* Logout Button */}
    
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="url"
              required
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-1 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
          <p className="text-sm text-center mt-6 text-gray-600">
  Thanks for using.{' '}
  <span
    onClick={handleLogout}
    className="text-blue-700 font-semibold cursor-pointer hover:underline"
  >
    Logout
  </span>
</p>


          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}

          {shortUrl && (
            <div className="mt-6 bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-700">Your shortened URL:</p>
              <a
                href={shortUrl}
                target="_blank"
                className="text-blue-600 font-semibold break-all hover:underline"
              >
                {shortUrl}
              </a>
              <p className="text-sm mt-2">
                <Link
                  href={`/stats/${shortUrl.split("/").pop()}`}
                  className="text-blue-700 font-medium hover:underline"
                  target="_blank"
                >
                  (Optional) View Stats →
                </Link>
              </p>
              
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
