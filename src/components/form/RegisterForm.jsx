import { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, Image } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Loader, ErrorMessage } from "../index.js";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    avatar: null,
  });

  // 🔥 input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "avatar" ? files[0] : value,
    }));
  };

  // 🔥 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      const res = await axios.post("/api/v1/user/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("SUCCESS:", res.data);

      navigate("/login");
    } catch (err) {
      console.log("ERROR:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-neutral-950 border border-green-500/20 rounded-2xl p-6 shadow-[0_0_25px_rgba(34,197,94,0.15)]"
      >

        <h2 className="text-2xl font-bold text-green-400 text-center mb-6">
          Create Account
        </h2>

        {/* 🔴 ERROR */}
        {error && <ErrorMessage message={error} />}

        {/* Username */}
        <Input
          icon={<User className="text-green-400" size={16} />}
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />

        {/* Email */}
        <Input
          icon={<Mail className="text-green-400" size={16} />}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />

        {/* Password */}
        <Input
          icon={<Lock className="text-green-400" size={16} />}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />

        {/* Full Name */}
        <Input
          icon={<User className="text-green-400" size={16} />}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        {/* Avatar */}
        <div className="mb-4 flex items-center bg-neutral-900 border border-green-500/20 rounded-lg px-3 py-2">
          <Image size={16} className="text-green-400" />
          <input
            type="file"
            name="avatar"
            onChange={handleChange}
            className="text-gray-300 text-sm px-2 w-full file:bg-green-500 file:text-black file:px-2 file:py-1 file:rounded"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-400 text-black py-2 rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}

/* 🔥 Reusable Input */
const Input = ({ icon, ...props }) => (
  <div className="mb-4 flex items-center bg-neutral-900 border border-green-500/20 rounded-lg px-3 py-2 focus-within:border-green-400 transition">
    {icon}
    <input
      {...props}
      required
      className="bg-transparent outline-none px-2 text-sm w-full text-gray-200 placeholder-gray-500 autofill:bg-transparent"
    />
  </div>
);