import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { House, Stethoscope, CalendarDays, User, LogIn, Info } from "lucide-react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext.jsx";

const BottomNav = () => {
    const navigate = useNavigate();
    const { token } = useContext(AppContext);

    const navItems = token
        ? [
            { label: "Home", icon: House, path: "/" },
            { label: "Doctors", icon: Stethoscope, path: "/doctors" },
            { label: "Appointments", icon: CalendarDays, path: "/my-appointments" },
            { label: "Profile", icon: User, path: "/my-profile" },
        ]
        : [
            { label: "Home", icon: House, path: "/" },
            { label: "Doctors", icon: Stethoscope, path: "/doctors" },
            { label: "About", icon: Info, path: "/about" },
            { label: "Login", icon: LogIn, path: "/login" },
        ];

    return (
        <motion.div
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="fixed bottom-4 left-0 right-0 z-30 lg:hidden"
        >
            <div className="mx-3 rounded-full border border-gray-200 bg-white px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <div className="grid grid-cols-4 items-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={(e) => {
                                    if (item.path === "/login") {
                                        e.preventDefault();
                                        navigate("/login");
                                    }
                                }}
                                className="flex items-center justify-center"
                            >
                                {({ isActive }) => (
                                    <div
                                        className={`flex min-w-[60px] flex-col items-center justify-center rounded-full px-1.5 py-1 transition-all duration-200 ${isActive
                                            ? "text-purple-700"
                                            : "text-gray-500 active:scale-95"
                                            }`}
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full">
                                            <Icon size={19} strokeWidth={isActive ? 2.4 : 2} />
                                        </div>

                                        <span
                                            className={`mt-0.5 text-[10px] leading-none transition-all duration-200 ${isActive ? "font-semibold" : "font-medium"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default BottomNav;