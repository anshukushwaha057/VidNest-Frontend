import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components/index.js";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar toggleSidebar={() => setIsOpen(true)} />

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* ✅ Content */}
      <main className="pt-16 md:ml-64 p-4">
        <Outlet />
      </main>
    </>
  );
};


export default MainLayout;