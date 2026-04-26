import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-black border border-green-500/20 p-6 rounded-2xl">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-center text-green-400 mb-6 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)]">
          VidNest
        </h1>

        {/* Page content */}
        <Outlet />

      </div>
    </div>
  );
};

export default AuthLayout;