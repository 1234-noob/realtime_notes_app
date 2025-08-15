import React, { useState } from "react";
import api from "../api";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggle = () => setMode(mode === "login" ? "register" : "login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "register") {
        await api.post("/register", { email, password });
      }
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full space-y-4">
        <h1 className="text-2xl font-semibold text-center text-gray-950">
          Realtime Notes
        </h1>
        <p className="text-center text-sm text-gray-700">
          {mode === "login" ? "Login to your account" : "Create a new account"}
        </p>
        {error && (
          <div className="rounded-lg bg-red-100 text-red-700 p-2 text-sm">
            {error}
          </div>
        )}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm text-gray-800">Email</label>
            <input
              className="input placeholder:text-gray-900 text-black bg-white"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm  bg-white text-gray-800">Password</label>
            <input
              className="input placeholder:text-gray-900 text-black bg-white"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Register & Login"}
          </button>
        </form>
        <button
          className="text-sm underline w-full text-center text-black"
          onClick={toggle}
        >
          {mode === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
