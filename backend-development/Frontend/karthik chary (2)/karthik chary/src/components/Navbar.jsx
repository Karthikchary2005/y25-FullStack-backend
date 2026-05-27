import React from 'react';

import {
  Bell,
  Search,
  Cpu
} from 'lucide-react';

import {
  useAuth
} from '../context/AuthContext';


export const Navbar = ({
  onSearchFocus
}) => {

  const {
    user
  } = useAuth();

  // DATE
  const today =
    new Date().toLocaleDateString(

      'en-US',

      {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }
    );

  // SAFE NAME
  const firstName =

    user?.name
      ? user.name.split(' ')[0]
      : "User";


  return (

    <header className="h-16 px-6 bg-[#070b14]/80 border-b border-white/5 flex items-center justify-between sticky top-0 backdrop-blur-md z-20">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-secondary/5 border border-brand-secondary/20 text-xs font-semibold text-brand-secondary">

          <Cpu
            size={12}
            className="animate-spin"
            style={{
              animationDuration: '8s'
            }}
          />

          <span>

            System Status: Optimal

          </span>

          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary shadow-glow-cyan animate-pulse"></span>

        </div>

        <span className="text-xs text-gray-500 font-mono hidden md:inline">

          | {today}

        </span>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <button

          onClick={onSearchFocus}

          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-dark/40 border border-white/10 hover:border-brand-secondary/35 text-gray-500 hover:text-gray-300 text-xs transition-all w-48 md:w-64 text-left justify-between"
        >

          <div className="flex items-center gap-2">

            <Search
              size={14}
              className="text-gray-500"
            />

            <span>

              Smart AI Search...

            </span>

          </div>

          <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-semibold text-gray-400">

            ⌘ K

          </kbd>

        </button>

        {/* NOTIFICATIONS */}
        <div className="relative">

          <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">

            <Bell size={18} />

            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-primary rounded-full shadow-glow-violet animate-pulse"></span>

          </button>

        </div>

        {/* USER */}
        {user && (

          <div className="hidden sm:flex flex-col text-right">

            <span className="text-xs text-gray-400">

              Welcome,

            </span>

            <span className="text-xs font-semibold text-white">

              {firstName}

            </span>

          </div>
        )}

      </div>

    </header>
  );
};

export default Navbar;