import { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Cross, LogOut, Menu, X, Home, Stethoscope, Info, Phone, User, CalendarDays } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { token, setToken, userData } = useContext(AppContext)

    const [isOpen, setIsOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [drawerType, setDrawerType] = useState(null)

    const profileRef = useRef(null)
    const mobileMenuRef = useRef(null)
    const mobileButtonRef = useRef(null)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/login')
        setIsOpen(false)
        setIsMenuOpen(false)
        setDrawerType(null)
    }

    const handleMobileMenuToggle = () => {
        setIsMenuOpen(prev => !prev)
        setIsOpen(false)
        setDrawerType(prev => (prev === 'menu' ? null : 'menu'))
    }

    const handleProfileToggle = () => {
        setIsOpen(false)
        setIsMenuOpen(false)
        setDrawerType(prev => (prev === 'profile' ? null : 'profile'))
    }

    const closeAllMenus = () => {
        setIsOpen(false)
        setIsMenuOpen(false)
        setDrawerType(null)
    }

    useEffect(() => {
        setIsOpen(false)
        setIsMenuOpen(false)
        setDrawerType(null)
    }, [location.pathname])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                drawerType === 'profile' &&
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setDrawerType(null)
            }

            if (
                drawerType === 'menu' &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                mobileButtonRef.current &&
                !mobileButtonRef.current.contains(event.target)
            ) {
                setDrawerType(null)
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('pointerdown', handleClickOutside)

        return () => {
            document.removeEventListener('pointerdown', handleClickOutside)
        }
    }, [drawerType])

    useEffect(() => {
        if (drawerType) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [drawerType])

    const base = 'px-8 py-3 rounded-4xl border-0 text-md hover:text-purple-600 transition-all'
    const active = 'bg-white text-purple-700'
    const noActive = 'text-black hover:bg-white'

    const mobileBackdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    }

    const drawerVariants = {
        hidden: { x: '100%' },
        visible: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 28
            }
        },
        exit: {
            x: '100%',
            transition: {
                duration: 0.22,
                ease: 'easeInOut'
            }
        }
    }

    const mobileLinkBase =
        'flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition-colors duration-200'

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
                                scale: 0.88
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
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className='hidden md:block group bg-purple-900 px-5 py-2 rounded-full cursor-pointer text-white font-medium   '
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
                    {drawerType === 'menu' ? <X /> : <Menu />}
                </button>
            </div>

            <AnimatePresence>
                {drawerType && (
                    <>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={mobileBackdropVariants}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/35 z-40"
                        />

                        <motion.div
                            ref={drawerType === 'menu' ? mobileMenuRef : profileRef}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={drawerVariants}
                            className="fixed top-0 right-0 h-[100dvh] w-[82%] max-w-[360px] bg-white shadow-2xl z-[60] flex flex-col"
                        >
                            <div className='flex items-center justify-end px-4 pt-4 pb-2'>
                                <button
                                    onClick={closeAllMenus}
                                    className='h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition'
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            {token && userData && (
                                <div className='px-4 pb-3 border-b border-gray-100'>
                                    <div
                                        onClick={() => {
                                            navigate('/my-profile')
                                            closeAllMenus()
                                        }}
                                        className='flex items-center gap-3 rounded-3xl bg-purple-50 px-4 py-4 cursor-pointer'
                                    >
                                        <div className='w-12 h-12 rounded-full overflow-hidden border border-purple-200 bg-purple-100 shrink-0'>
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
                                </div>
                            )}

                            <div className='flex-1 overflow-y-auto px-4 py-4 pb-6 flex flex-col gap-2'>
                                <NavLink
                                    to="/"
                                    onClick={closeAllMenus}
                                    className={({ isActive }) =>
                                        `${mobileLinkBase} ${isActive
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'text-gray-700 hover:bg-purple-50'}`
                                    }
                                >
                                    <Home size={18} />
                                    <span>Home</span>
                                </NavLink>

                                <NavLink
                                    to="/doctors"
                                    onClick={closeAllMenus}
                                    className={({ isActive }) =>
                                        `${mobileLinkBase} ${isActive
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'text-gray-700 hover:bg-purple-50'}`
                                    }
                                >
                                    <Stethoscope size={18} />
                                    <span>Our Doctors</span>
                                </NavLink>

                                {token && userData && (
                                    <>
                                        <button
                                            onClick={() => {
                                                navigate('/my-profile')
                                                closeAllMenus()
                                            }}
                                            className='flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-purple-50 transition text-left cursor-pointer'
                                        >
                                            <User size={18} />
                                            <span>My Profile</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                navigate('/my-appointments')
                                                closeAllMenus()
                                            }}
                                            className='flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-purple-50 transition text-left cursor-pointer'
                                        >
                                            <CalendarDays size={18} />
                                            <span>My Appointments</span>
                                        </button>
                                    </>
                                )}

                                <NavLink
                                    to="/about"
                                    onClick={closeAllMenus}
                                    className={({ isActive }) =>
                                        `${mobileLinkBase} ${isActive
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'text-gray-700 hover:bg-purple-50'}`
                                    }
                                >
                                    <Info size={18} />
                                    <span>About</span>
                                </NavLink>

                                <NavLink
                                    to="/contact"
                                    onClick={closeAllMenus}
                                    className={({ isActive }) =>
                                        `${mobileLinkBase} ${isActive
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'text-gray-700 hover:bg-purple-50'}`
                                    }
                                >
                                    <Phone size={18} />
                                    <span>Contact</span>
                                </NavLink>

                                {token && userData ? (
                                    <button
                                        onClick={logout}
                                        className='mt-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 transition text-left cursor-pointer'
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            navigate('/login')
                                            closeAllMenus()
                                        }}
                                        className='mt-3 w-full rounded-2xl bg-purple-700 px-4 py-3 text-white font-medium hover:bg-purple-800 transition cursor-pointer'
                                    >
                                        Sign Up
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Navbar