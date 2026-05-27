import React from 'react';

import {

  Play,

  CheckCircle2,

  RotateCcw,

  HelpCircle

} from 'lucide-react';


export const StatusBadge = ({
  status
}) => {

  const getStatusStyles = () => {

    switch (status) {

      case 'OPEN':

        return {

          bg: 'bg-blue-500/10',

          border: 'border-blue-500/20',

          text: 'text-blue-400',

          dot: 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]',

          icon: HelpCircle
        };

      case 'IN_PROGRESS':

        return {

          bg: 'bg-yellow-500/10',

          border: 'border-yellow-500/20',

          text: 'text-yellow-400',

          dot: 'bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.5)]',

          icon: Play
        };

      case 'RESOLVED':

        return {

          bg: 'bg-emerald-500/10',

          border: 'border-emerald-500/20',

          text: 'text-emerald-400',

          dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]',

          icon: CheckCircle2
        };

      case 'CLOSED':

        return {

          bg: 'bg-gray-500/10',

          border: 'border-gray-500/20',

          text: 'text-gray-400',

          dot: 'bg-gray-400 shadow-[0_0_8px_rgba(107,114,128,0.5)]',

          icon: RotateCcw
        };

      default:

        return {

          bg: 'bg-white/5',

          border: 'border-white/10',

          text: 'text-white',

          dot: 'bg-white',

          icon: HelpCircle
        };
    }
  };

  const styles =
    getStatusStyles();

  const Icon =
    styles.icon;

  // SAFE LABEL
  const formattedStatus =

    status
      ? status.replaceAll('_', ' ')
      : 'OPEN';


  return (

    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles.bg} ${styles.border} ${styles.text}`}>

      {/* DOT */}
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}></span>

      {/* ICON */}
      <Icon
        size={12}
        className="opacity-80"
      />

      {/* LABEL */}
      <span>

        {formattedStatus}

      </span>

    </span>
  );
};

export default StatusBadge;