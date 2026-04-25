import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PenSquare,
  CalendarDays,
  BarChart3,
  Link as LinkIcon,
  Image   // ✅ ADDED
} from "lucide-react";
export default function Layout({ children }) {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Create Post",
      path: "/create",
      icon: PenSquare
    },
    {
      name: "Scheduled",
      path: "/scheduled",
      icon: CalendarDays
    },
    {
    name: "Platforms",   // ✅ NEW
    path: "/platforms",
    icon: LinkIcon
    },
    {
        name: "Media",
        path: "/media",
        icon: Image
        },
    {
      name: "Logs",
      path: "/logs",
      icon: BarChart3
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 p-6 flex flex-col">

        {/* LOGO */}
        <h1 className="text-xl font-bold text-indigo-600 mb-10 tracking-tight">
          Social AI
        </h1>

        {/* MENU */}
        <nav className="space-y-2 flex-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="text-xs text-gray-400 mt-6">
          © 2026 Social AI
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}