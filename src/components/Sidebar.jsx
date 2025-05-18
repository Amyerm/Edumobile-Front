import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotificationHub } from "../hooks/useNotificationHub";
import { FaBell } from "react-icons/fa";
import {
    FaHome,
    FaBook,
    FaProjectDiagram,
    FaUserFriends,
    FaGamepad,
    FaCog,
    FaLifeRing,
    FaUserCircle,
    FaChevronRight,
    FaPlusCircle,
} from "react-icons/fa";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const { notifications: realtimeNotifications } = useNotificationHub();
    const [showPopup, setShowPopup] = useState(true);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Cargar historial de notificaciones
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch("/api/Notifications", { credentials: "include" });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchNotifications();
    }, []);

    // Actualizar notificaciones con las recibidas en tiempo real
    useEffect(() => {
        if (realtimeNotifications?.length) {
            setNotifications((prev) => [...realtimeNotifications, ...prev]);
        }
    }, [realtimeNotifications]);

    // Link styles
    const baseLink =
        "flex items-center gap-3 py-2 pl-4 pr-2 rounded-full transition-colors hover:bg-[#4F46E5]/10 hover:text-[#4F46E5]";
    const activeLink =
        "flex items-center gap-3 py-2 pl-4 pr-2 rounded-full bg-[#4F46E5]/10 text-[#4F46E5]";

    return (
        <>
            <aside className="fixed top-0 left-0 h-screen w-64 bg-white text-[#64748B] p-4 pt-8 flex flex-col">
                {/* Logo y título */}
                <div className="flex items-center gap-2 mb-10">
                    <img src="/logo-2.svg" alt="Logo" className="w-6 h-6" />
                    <span className="text-xl font-bold text-black">Edumobile</span>
                </div>

                {/* Navegación principal */}
                <nav className="space-y-1 text-sm overflow-y-auto">
                    <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : baseLink)}>
                        <FaHome className="w-5 h-5" />
                        <span>Inicio</span>
                    </NavLink>

                    {user?.role === "Profesor" ? (
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeLink : baseLink)}>
                            <FaBook className="w-5 h-5" />
                            <span>Cursos</span>
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to="/my-projects" className={({ isActive }) => (isActive ? activeLink : baseLink)}>
                                <FaProjectDiagram className="w-5 h-5" />
                                <span>Mis Proyectos</span>
                            </NavLink>
                            <NavLink to="/media-game" className={({ isActive }) => (isActive ? activeLink : baseLink)}>
                                <FaGamepad className="w-5 h-5" />
                                <span>Media Query Game</span>
                            </NavLink>
                        </>
                    )}

                </nav>

                {/* Divider */}
                <hr className="border-gray-200 my-4" />

                {/* Configuración y soporte */}
                <nav className="space-y-1 text-sm">
                    <NavLink to="/profile" className={({ isActive }) => (isActive ? activeLink : baseLink)}>
                        <FaCog className="w-5 h-5" />
                        <span>Configuración</span>
                    </NavLink>

                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfzdi8RAKM6yQTqXl2SPa2D_-VRtd_KpN451ip-DNHTLIob4w/viewform?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={baseLink}
                    >
                        <FaLifeRing className="w-5 h-5" />
                        <span>Reportar un error</span>
                    </a>
                </nav>

                {/* Usuario / Sesión */}
                <div className="mt-auto pt-4 border-t border-gray-200 text-xs">
                    {!user ? (
                        <div className="space-y-2">
                            <NavLink to="/login" className="block py-2 px-4 rounded hover:bg-gray-200">
                                Iniciar Sesión
                            </NavLink>
                            <NavLink to="/register" className="block py-2 px-4 rounded hover:bg-gray-200">
                                Registrar­se
                            </NavLink>
                        </div>
                    ) : (
                        <div className="relative flex items-center gap-2">
                            <NavLink to="/profile" className="flex items-center gap-2 hover:opacity-90">
                                <FaUserCircle className="w-6 h-6 text-gray-500" />
                                <span className="text-black">
                                    {user.nombre} {user.apellidoPaterno}
                                </span>
                            </NavLink>
                            <button className="ml-auto" onClick={toggleDropdown}>
                                <FaChevronRight className="w-4 h-4 text-gray-500" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 bg-white text-black border rounded shadow w-32 z-50">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left block px-3 py-2 hover:bg-gray-100 text-sm"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </aside>

                {/* Barra de notificaciones abajo-derecha */}
                 {showPopup && (
                <div className="fixed bottom-4 right-4 z-50 w-80 bg-[#EEF2FF] rounded-2xl shadow-lg p-4">
                    {/* Header con título y botón de cerrar */}
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-[#4F46E5] font-semibold text-lg">Notificaciones</h3>
                            <button onClick={() => setShowPopup(false)}
                                className="text-[#4F46E5] font-bold">X
                            </button>
                        </div>
                    { notifications.length === 0 ? (
                        <p className="text-[#4F46E5] text-sm text-center">No hay notificaciones</p>
                        ) : (
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {notifications.map((n) => (
                                <li key={n.id} className="text-[#4F46E5] text-sm">
                                    {n.message}
                                </li>
                            ))}
                        </ul>
                    )}
                </div >
            )}
        </>
    );
};

export default Sidebar;
