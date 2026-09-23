import { useState } from "react";
import { FiHome, FiMenu, FiPlusCircle, FiUser, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? "text-slate-950" : "text-slate-500 hover:text-slate-900"
  }`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const isOwner = user?.role === "owner" || user?.role === "admin";

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-950 text-white">
            <FiHome />
          </span>
          <span className="text-xl font-semibold tracking-tight text-slate-950">
            EstateHub
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/properties" className={navLinkClass}>
            Properties
          </NavLink>
          <NavLink to="/ai-recommend" className={navLinkClass}>AI Recommendation</NavLink>
          {isAuthenticated && isOwner && (
            <>
              <NavLink to="/owner/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/owner/my-properties" className={navLinkClass}>
                My Properties
              </NavLink>
            </>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {isOwner && (
                <Link
                  to="/owner/add-property"
                  className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  <FiPlusCircle />
                  Add Property
                </Link>
              )}
              <Link
                to="/profile"
                className="grid h-10 w-10 place-items-center rounded-md border border-slate-300 text-slate-700 transition hover:border-slate-950"
                title="Profile"
              >
                <FiUser />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-slate-500 transition hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-slate-300 text-slate-700 md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/properties" className={navLinkClass} onClick={closeMenu}>
              Properties
            </NavLink>
            {isAuthenticated && isOwner && (
              <>
                <NavLink
                  to="/owner/dashboard"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/owner/my-properties"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  My Properties
                </NavLink>
                <Link
                  to="/owner/add-property"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white"
                >
                  <FiPlusCircle />
                  Add Property
                </Link>
              </>
            )}
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-md bg-slate-950 px-4 py-2 text-center text-sm font-medium text-white"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <Link to="/profile" onClick={closeMenu} className="text-sm font-medium">
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
