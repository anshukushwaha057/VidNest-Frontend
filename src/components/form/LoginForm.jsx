import { useState } from "react";
import axios from "axios";
import { User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Loader, ErrorMessage } from "../index.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/api/v1/user/login", {
        email,
        password,
      });

      localStorage.setItem("accessToken", res.data.token);

      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black border border-green-500/20 rounded-2xl p-6 shadow-[0_0_25px_rgba(34,197,94,0.15)]"
      >

        {/* Title */}
        <h2 className="text-2xl font-bold text-green-400 text-center mb-6">
          Login to VideNest
        </h2>

        {/* 🔴 ERROR */}
        {error && <ErrorMessage message={error} />}

        {/* Identifier */}
        <div className="mb-4">
          <div className="flex items-center bg-neutral-900 border border-green-500/20 rounded-lg px-3 py-2 focus-within:border-green-400 transition">
            <User size={16} className="text-green-400" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="bg-transparent outline-none px-2 text-sm w-full text-gray-200 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="flex items-center bg-neutral-900 border border-green-500/20 rounded-lg px-3 py-2 focus-within:border-green-400 transition">
            <Lock size={16} className="text-green-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="bg-transparent outline-none px-2 text-sm w-full text-gray-200 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-medium py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default LoginForm;