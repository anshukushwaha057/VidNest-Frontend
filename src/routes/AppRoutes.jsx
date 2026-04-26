import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import { RegisterPage, LoginPage, HomePage } from "../pages/index.js";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthLayout from "../layouts/AuthLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>

            {/* ✅ Auth layout (NO navbar/sidebar) */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* ✅ Main layout (WITH navbar/sidebar) */}
            <Route element={<MainLayout />}>

                <Route path="/" element={<HomePage />} />

                <Route element={<ProtectedRoutes />}>
                </Route>

            </Route>

        </Route>
    )
);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;