"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoHome = () => {
    setLoading(true); // show spinner
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button or Loader */}
      {loading ? (
        <div className="flex items-center justify-center mt-4">
          <div className="w-8 h-8 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <button
          onClick={handleGoHome}
          className="px-6 py-2 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition duration-300"
        >
          Go Back Home
        </button>
      )}
    </div>
  );
}
