import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ isOpen, setIsOpen }) => {
    const linkClasses = ({ isActive }) =>
        `block px-4 py-2 rounded font-semibold ${isActive
            ? 'bg-indigo-600 text-white'
            : 'hover:bg-indigo-100 text-gray-700'
        }`

    return (
        <aside
            className={`w-64 bg-white shadow-md p-6 h-full z-40 transition-transform duration-300
                ${isOpen ? 'block fixed top-0 left-0' : 'hidden'}
                md:block md:static`}
        >

            <button
                className="md:hidden mb-4 text-right text-sm text-gray-500"
                onClick={() => setIsOpen(false)}
            >
                ✕
            </button>

            <h1 className="text-2xl font-bold mb-8 text-indigo-700">Gym Admin</h1>
            <nav className="space-y-4">
                <NavLink to="/dashboard" className={linkClasses}>
                    Dashboard
                </NavLink>
                <NavLink to="/list" className={linkClasses}>
                    Add Members
                </NavLink>
                <NavLink to="/all-members" className={linkClasses}>
                    All Members
                </NavLink>
                <NavLink to="/ex-members" className={linkClasses}>
                    Expired Members
                </NavLink>
                <NavLink to="/" className={linkClasses}>
                    Logout
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar
