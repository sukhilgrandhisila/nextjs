"use client";
import {setCookie} from 'cookies-next'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Login = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState<{ username: string; password: string } | null>(null);
  const router = useRouter();

  // Perform login when loginData changes
  useEffect(() => {
    if (!loginData) return;

    const doLogin = async () => {
      setError("");
      try {
        const response = await fetch("https://apis.ccbp.in/login", {
          method: "POST",
          body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (response.ok) {
          setCookie("jwt_token", data.jwt_token),{
            maxAge:60*60*24,
            path:'/'
          };
          router.replace("/home");
        } else {
          setError(data.error_msg || "Invalid credentials");
        }
      } catch {
        setError("Something went wrong. Please try again.");
      }
    };

    doLogin();
  }, [loginData, router]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoginData({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2 text-sm font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
