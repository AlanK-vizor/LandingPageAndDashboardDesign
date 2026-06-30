import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { user, profile, signOut, configured } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/forum", label: "Q&A" },
    { to: "/chat", label: "Live Chat" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 bg-yellow-400 rounded-sm flex items-center justify-center">
              <div className="w-3.5 h-3.5 border-2 border-gray-950 rounded-sm" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">ArmLab</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {configured && user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  Dashboard
                </Link>
                <span className="text-gray-700 text-xs">|</span>
                <span className="text-sm text-gray-500">
                  {profile?.username ?? user.email?.split("@")[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-500 hover:text-white transition-colors"
                  title="Log out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-400 text-gray-950 text-sm font-bold px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
              >
                Log In
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-5 flex flex-col gap-4 border-t border-gray-800 mt-0 pt-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            {configured && user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="flex items-center gap-1.5 text-gray-500 text-sm text-left"
                >
                  <LogOut size={14} /> Log Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-yellow-400 text-gray-950 text-sm font-bold px-4 py-2 rounded-md text-center"
              >
                Log In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
