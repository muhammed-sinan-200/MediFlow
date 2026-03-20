import { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Cross, LogOut, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { token, setToken, userData } = useContext(AppContext)

    const [isOpen, setIsOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const profileRef = useRef(null)
    const mobileMenuRef = useRef(null)
    const mobileButtonRef = useRef(null)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/login')
        setIsOpen(false)
        setIsMenuOpen(false)
    }

    const handleMobileMenuToggle = () => {
        setIsMenuOpen(prev => !prev)
        setIsOpen(false)
    }

    const handleProfileToggle = () => {
        setIsOpen(prev => !prev)
        setIsMenuOpen(false)
    }

    const closeAllMenus = () => {
        setIsOpen(false)
        setIsMenuOpen(false)
    }

    useEffect(() => {
        setIsOpen(false)
        setIsMenuOpen(false)
    }, [location.pathname])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsOpen(false)
            }

            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                mobileButtonRef.current &&
                !mobileButtonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('pointerdown', handleClickOutside)

        return () => {
            document.removeEventListener('pointerdown', handleClickOutside)
        }
    }, [])

    const base = 'px-8 py-3 rounded-4xl border-0 text-md hover:text-purple-600 transition-all'
    const active = 'bg-white text-purple-700'
    const noActive = 'text-black hover:bg-white'

    const menuContainerVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            scale: 0.96
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 280,
                damping: 24
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.98,
            transition: {
                duration: 0.18
            }
        }
    }

    return (
        <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className='flex justify-between items-center text-sm p-4 border-0 rounded-4xl mb-5 bg-transparent relative z-50'
        >
            <NavLink to='/' onClick={closeAllMenus} className='flex gap-2 group justify-between items-center'>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className='bg-purple-700 p-2 rounded-2xl'
                >
                    <span className='text-2xl font-semibold flex gap-2'>
                        <Cross className='text-white' />
                    </span>
                </motion.div>
                <h1 className='text-2xl font-semibold'>MediFlow</h1>
            </NavLink>

            <ul className='hidden lg:flex justify-between items-start px-1.5 py-1 gap-3 font-semibold border-0 bg-gray-100/50 rounded-4xl'>
                <NavLink to='/' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>Home</NavLink>
                <NavLink to='/doctors' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>Our Doctors</NavLink>
                <NavLink to='/about' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>About</NavLink>
                <NavLink to='/contact' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>Contact</NavLink>
            </ul>

            <div className='flex items-center gap-2'>
                {token && userData ? (
                    <div ref={profileRef} className='relative hidden lg:block'>
                        <motion.div
                            onClick={handleProfileToggle}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 12px rgba(168,85,247,0.6)"
                            }}
                            whileTap={{
                                scale: 0.88,
                                filter: "brightness(0.9)"
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 18 }}
                            className='w-11 h-11 rounded-full overflow-hidden border border-purple-300 bg-purple-200 cursor-pointer select-none'
                        >
                            <img
                                className='w-full h-full object-cover'
                                src={userData.image}
                                alt="Profile"
                            />
                        </motion.div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={menuContainerVariants}
                                    className='absolute top-12 right-0 pt-2 text-base z-20 origin-top-right'
                                >
                                    <div className='w-72 border border-purple-700/30 outline-none bg-white/30 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden'>
                                        <div className='flex items-center gap-3 px-4 py-4 border-b border-purple-200/70'>
                                            <div className='w-12 h-12 rounded-full overflow-hidden border border-purple-300 bg-purple-200 flex-shrink-0'>
                                                <img
                                                    className='w-full h-full object-cover'
                                                    src={userData.image}
                                                    alt="Profile"
                                                />
                                            </div>

                                            <div className='min-w-0'>
                                                <p className='text-sm text-gray-500'>Signed in as</p>
                                                <p className='font-semibold text-gray-800 truncate'>{userData.name}</p>
                                                <p className='text-sm text-gray-500 truncate'>{userData.email}</p>
                                            </div>
                                        </div>

                                        <div className='p-3 flex flex-col gap-1'>
                                            <button
                                                onClick={() => {
                                                    navigate('/my-profile')
                                                    setIsOpen(false)
                                                }}
                                                className='w-full text-left px-4 py-3 rounded-2xl hover:bg-purple-50 transition cursor-pointer'
                                            >
                                                <p className='font-medium text-gray-800'>My Profile</p>
                                                <p className='text-sm text-gray-500'>View and edit your details</p>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    navigate('/my-appointments')
                                                    setIsOpen(false)
                                                }}
                                                className='w-full text-left px-4 py-3 rounded-2xl hover:bg-purple-50 transition cursor-pointer'
                                            >
                                                <p className='font-medium text-gray-800'>My Appointments</p>
                                                <p className='text-sm text-gray-500'>Check upcoming and past bookings</p>
                                            </button>
                                        </div>

                                        <div className='px-3 pb-3 pt-1 border-t border-purple-200/70'>
                                            <button
                                                onClick={logout}
                                                className='w-full flex items-center justify-between px-4 py-3 rounded-2xl group hover:bg-red-600 hover:text-white transition cursor-pointer'
                                            >
                                                <div className='text-left'>
                                                    <p className='font-medium text-gray-800 group-hover:text-white'>Logout</p>
                                                    <p className='text-sm text-gray-500 group-hover:text-white'>Sign out securely</p>
                                                </div>
                                                <LogOut size={18} className='text-gray-600 group-hover:text-white' />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className='hidden md:block group bg-purple-900 px-5 py-2 rounded-full cursor-pointer text-white font-medium hover:bg-white border border-purple-900 hover:border-purple-700 hover:text-purple-900 hover:shadow-md transition-all duration-200 ease-out'
                    >
                        <span className='group-hover:scale-105 inline-block transition-transform'>
                            Sign Up
                        </span>
                    </button>
                )}

                <button
                    ref={mobileButtonRef}
                    onClick={handleMobileMenuToggle}
                    className="lg:hidden p-2 rounded-full hover:bg-purple-100 transition-all"
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuContainerVariants}
                        className="absolute top-full right-2 mt-3 w-full bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-6 flex flex-col gap-4 lg:hidden z-50 border border-purple-200 origin-top"
                    >
                        {token && userData && (
                            <div className='flex items-center gap-3 pb-4 border-b border-purple-200'>
                                <div className='w-11 h-11 rounded-full overflow-hidden border border-purple-300 bg-purple-200'>
                                    <img
                                        className='w-full h-full object-cover'
                                        src={userData.image}
                                        alt="Profile"
                                    />
                                </div>
                                <div className='min-w-0'>
                                    <p className='font-semibold text-gray-800 truncate'>{userData.name}</p>
                                    <p className='text-sm text-gray-500 truncate'>{userData.email}</p>
                                </div>
                            </div>
                        )}

                        <NavLink
                            to="/"
                            onClick={closeAllMenus}
                            className="block px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700"
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/doctors"
                            onClick={closeAllMenus}
                            className="block px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700"
                        >
                            Our Doctors
                        </NavLink>

                        <NavLink
                            to="/about"
                            onClick={closeAllMenus}
                            className="block px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700"
                        >
                            About
                        </NavLink>

                        <NavLink
                            to="/contact"
                            onClick={closeAllMenus}
                            className="block px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700"
                        >
                            Contact
                        </NavLink>

                        {token && userData ? (
                            <>
                                <div className='border-t border-purple-200 pt-2 mt-1' />

                                <button
                                    onClick={() => {
                                        navigate('/my-profile')
                                        closeAllMenus()
                                    }}
                                    className='px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700 text-left cursor-pointer'
                                >
                                    My Profile
                                </button>

                                <button
                                    onClick={() => {
                                        navigate('/my-appointments')
                                        closeAllMenus()
                                    }}
                                    className='px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700 text-left cursor-pointer'
                                >
                                    My Appointments
                                </button>

                                <button
                                    onClick={logout}
                                    className='px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700 text-left cursor-pointer flex items-center gap-2'
                                >
                                    <span>Logout</span>
                                    <LogOut size={18} />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    navigate('/login')
                                    closeAllMenus()
                                }}
                                className='px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700 text-left cursor-pointer'
                            >
                                Sign Up
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Navbar