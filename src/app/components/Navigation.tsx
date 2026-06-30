import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { user, profile, signOut, configured } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/forum", label: "Q&A" },
    { to: "/chat", label: "Live Chat" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/70 backdrop-blur-xl border-b border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]">
              <div className="w-4 h-4 border-2 border-white rounded-sm" />
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">Robotic Arm Kits</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
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

          <div className="hidden lg:flex items-center gap-3">
            {configured && user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  {profile?.username ?? user.email?.split("@")[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
                  title="Log out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Log In
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gray-300"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-5 flex flex-col gap-4 border-t border-gray-800/60 mt-1 pt-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            {configured && user ? (
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="flex items-center gap-1.5 text-gray-300 text-sm text-left"
              >
                <LogOut size={15} /> Log Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center"
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
