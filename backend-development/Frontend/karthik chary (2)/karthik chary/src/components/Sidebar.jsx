import React, {
  useState
} from 'react';

import {
  NavLink,
  useNavigate
} from 'react-router-dom';

import {
  motion
} from 'framer-motion';

import {

  LayoutDashboard,

  PlusSquare,

  ListTodo,

  ShieldAlert,

  LogOut,

  ChevronLeft,

  ChevronRight,

  Bug,

  User

} from 'lucide-react';

import {
  useAuth
} from '../context/AuthContext';


export const Sidebar = () => {

  const [collapsed, setCollapsed] =
    useState(false);

  const {
    user,
    logout
  } = useAuth();

  const navigate =
    useNavigate();


  // LOGOUT
  const handleLogout = () => {

    logout();

    navigate('/login');
  };


  // NAVIGATION
  const navItems = [

    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },

    {
      path: '/create-issue',
      label: 'Create Issue',
      icon: PlusSquare
    },

    {
      path: '/issues',
      label: 'Issue Board',
      icon: ListTodo
    }
  ];


  // ADMIN ONLY
  if (

    user &&

    user.role === 'ADMIN'

  ) {

    navItems.push({

      path: '/admin',

      label: 'Admin Panel',

      icon: ShieldAlert
    });
  }


  const sidebarWidth =
    collapsed
      ? 80
      : 260;


  // SAFE USER DATA
  const userName =

    user?.name ||

    "User";

  const userRole =

    user?.role ||

    "USER";


  return (

    <motion.aside

      className="h-screen bg-[#070b14]/80 border-r border-white/5 flex flex-col justify-between sticky top-0 z-30"

      animate={{
        width: sidebarWidth
      }}

      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }}

      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >

      {/* HEADER */}
      <div className="p-5 flex items-center justify-between border-b border-white/5 relative">

        <NavLink

          to="/dashboard"

          className="flex items-center gap-3 select-none"
        >

          {/* LOGO */}
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-glow-cyan">

            <Bug className="w-5 h-5 text-white animate-pulse" />

          </div>

          {/* TITLE */}
          {!collapsed && (

            <motion.span

              className="font-display font-bold text-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"

              initial={{
                opacity: 0,
                x: -10
              }}

              animate={{
                opacity: 1,
                x: 0
              }}

              exit={{
                opacity: 0,
                x: -10
              }}
            >

              RESOLVE

              <span className="text-brand-secondary font-medium">

                .AI

              </span>

            </motion.span>
          )}

        </NavLink>

        {/* TOGGLE */}
        <button

          onClick={() =>

            setCollapsed(
              !collapsed
            )
          }

          className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-brand-bg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-secondary/40 transition-colors"
        >

          {collapsed

            ? <ChevronRight size={12} />

            : <ChevronLeft size={12} />
          }

        </button>

      </div>


      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">

        {navItems.map((item) => {

          const Icon =
            item.icon;

          return (

            <NavLink

              key={item.path}

              to={item.path}

              className={({ isActive }) =>

                `flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all group relative ${

                  isActive

                    ? 'text-white bg-white/5 shadow-inner border border-white/10'

                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >

              {({ isActive }) => (

                <>

                  {/* ACTIVE BAR */}
                  {isActive && (

                    <motion.div

                      className="absolute left-0 top-2 bottom-2 w-[3px] bg-brand-secondary rounded-r-full shadow-glow-cyan"

                      layoutId="activeGlow"
                    />
                  )}

                  {/* ICON */}
                  <Icon

                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${

                      isActive

                        ? 'text-brand-secondary'

                        : 'text-gray-400 group-hover:text-brand-secondary'
                    }`}
                  />

                  {/* LABEL */}
                  {!collapsed && (

                    <motion.span

                      initial={{
                        opacity: 0
                      }}

                      animate={{
                        opacity: 1
                      }}

                      exit={{
                        opacity: 0
                      }}
                    >

                      {item.label}

                    </motion.span>
                  )}

                  {/* TOOLTIP */}
                  {collapsed && (

                    <div className="absolute left-20 bg-brand-dark border border-white/10 px-3 py-1.5 rounded-md text-xs font-semibold text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap shadow-glass-lg">

                      {item.label}

                    </div>
                  )}

                </>
              )}

            </NavLink>
          );
        })}

      </nav>


      {/* FOOTER */}
      <div className="p-4 border-t border-white/5 space-y-4">

        {/* USER */}
        {user && (

          <div className="flex items-center gap-3 overflow-hidden">

            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full border border-white/20 bg-brand-bg flex items-center justify-center text-gray-300">

              <User size={16} />

            </div>

            {/* INFO */}
            {!collapsed && (

              <motion.div

                className="flex-1 min-w-0"

                initial={{
                  opacity: 0
                }}

                animate={{
                  opacity: 1
                }}

                exit={{
                  opacity: 0
                }}
              >

                <p className="text-sm font-semibold text-white truncate">

                  {userName}

                </p>

                <span className="text-[10px] uppercase font-mono tracking-wider text-brand-secondary px-1.5 py-0.5 rounded bg-brand-secondary/10 border border-brand-secondary/20">

                  {userRole}

                </span>

              </motion.div>
            )}

          </div>
        )}


        {/* LOGOUT */}
        <button

          onClick={handleLogout}

          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all group"
        >

          <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />

          {!collapsed && (

            <span>

              Logout

            </span>
          )}

          {collapsed && (

            <div className="absolute left-20 bg-brand-dark border border-red-500/20 px-3 py-1.5 rounded-md text-xs font-semibold text-red-400 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap shadow-glass-lg">

              Logout

            </div>
          )}

        </button>

      </div>

    </motion.aside>
  );
};

export default Sidebar;