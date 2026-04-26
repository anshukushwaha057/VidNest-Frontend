import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Menu, User, Search, LogOut, LogIn } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  // ✅ logout API + cleanup
  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (err) {
      console.log("Logout API error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setOpen(false);
      navigate("/login");
    }
  };

  // close dropdown outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-black border-b border-green-500/10 flex items-center justify-between px-3 sm:px-4">

      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded hover:bg-green-500/5 md:hidden transition"
        >
          <Menu size={22} className="text-green-400" />
        </button>

        <Link to="/" className="text-lg sm:text-xl font-bold text-green-400">
          <span className="sm:hidden">VN</span>
          <span className="hidden sm:inline">VideNest</span>
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center bg-neutral-900 border border-green-500/10 rounded-full px-2 sm:px-3 py-1 w-[55%] sm:w-[35%] max-w-xs sm:max-w-sm focus-within:border-green-400 transition">

        <Search size={16} className="text-green-400" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none px-2 text-sm w-full text-gray-200 placeholder-gray-500"
        />
      </div>

      {/* Profile */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="w-8 h-8 sm:w-9 sm:h-9 bg-neutral-800 border border-green-500/10 rounded-full flex items-center justify-center cursor-pointer hover:shadow-[0_0_6px_rgba(34,197,94,0.4)] transition"
        >
          <User size={16} className="text-green-400" />
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-36 bg-neutral-900 border border-green-500/10 shadow-md rounded-lg p-2">

            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-2 py-2 text-gray-300 hover:bg-red-500/10 hover:text-red-400 rounded transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left px-2 py-2 text-gray-300 hover:bg-green-500/10 hover:text-green-400 rounded transition"
              >
                <LogIn size={16} />
                Login
              </button>
            )}

          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;