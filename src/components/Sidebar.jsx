import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  User,
  Video,
  LogIn,
  LogOut,
  VideotapeIcon,
  X
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const linkStyle = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
    isActive
      ? "bg-green-500/15 text-green-400 border-l-4 border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
      : "text-gray-300 hover:bg-red-500/5 hover:text-red-300"
  }`;

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
    navigate("/login");
    setIsOpen(false);
  }
};

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] bg-black border-r border-green-500/20 transform transition-transform duration-300 ease-in-out z-50
        w-[75%] max-w-xs sm:w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >

        {/* Mobile Close */}
        <div className="flex justify-end p-3 md:hidden">
          <button onClick={() => setIsOpen(false)}>
            <X size={20} className="text-gray-400 hover:text-green-400" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-1 p-3 overflow-y-auto">

          <NavLink to="/" className={linkStyle} onClick={() => setIsOpen(false)}>
            <Home size={18} />
            Home
          </NavLink>

          <NavLink to="/account" className={linkStyle} onClick={() => setIsOpen(false)}>
            <User size={18} />
            Account
          </NavLink>

          <NavLink to="/dashboard" className={linkStyle} onClick={() => setIsOpen(false)}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/video" className={linkStyle} onClick={() => setIsOpen(false)}>
            <Video size={18} />
            My Video
          </NavLink>

          <NavLink to="/subscriptions" className={linkStyle} onClick={() => setIsOpen(false)}>
            <VideotapeIcon size={18} />
            Subscriptions
          </NavLink>

          <div className="border-t border-green-500/20 my-2"></div>

          {!token ? (
            <NavLink to="/login" className={linkStyle} onClick={() => setIsOpen(false)}>
              <LogIn size={18} />
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;