import { Github, Twitter, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-14 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-yellow-400 rounded-sm flex items-center justify-center">
                <div className="w-3.5 h-3.5 border-2 border-gray-950 rounded-sm" />
              </div>
              <span className="text-base font-bold text-white">ArmLab</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Educational robotic arm kits for students and makers.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/#kit", label: "Kit" },
                { to: "/forum", label: "Q&A" },
                { to: "/chat", label: "Live Chat" },
                { to: "/#curriculum", label: "Curriculum" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-500 hover:text-white transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/about", label: "About" },
                { to: "/#schools", label: "For Schools" },
                { to: "/#contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-500 hover:text-white transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-600 hover:text-white transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-600 text-sm">© 2026 ArmLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
