import React from 'react';

import {

  ArrowDown,

  ArrowRight,

  ArrowUp,

  AlertOctagon

} from 'lucide-react';


export const PriorityBadge = ({
  priority
}) => {

  const getPriorityStyles = () => {

    switch (priority) {

      case 'LOW':

        return {

          bg: 'bg-emerald-500/10',

          border: 'border-emerald-500/20',

          text: 'text-emerald-400',

          icon: ArrowDown
        };

      case 'MEDIUM':

        return {

          bg: 'bg-yellow-500/10',

          border: 'border-yellow-500/20',

          text: 'text-yellow-400',

          icon: ArrowRight
        };

      case 'HIGH':

        return {

          bg: 'bg-orange-500/10',

          border: 'border-orange-500/20',

          text: 'text-orange-400',

          icon: ArrowUp
        };

      case 'CRITICAL':

        return {

          bg: 'bg-red-500/10',

          border: 'border-red-500/20',

          text: 'text-red-400',

          icon: AlertOctagon
        };

      default:

        return {

          bg: 'bg-white/5',

          border: 'border-white/10',

          text: 'text-white',

          icon: ArrowDown
        };
    }
  };

  const styles =
    getPriorityStyles();

  const Icon =
    styles.icon;

  return (

    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles.bg} ${styles.border} ${styles.text}`}>

      <Icon

        size={12}

        className={
          priority === 'CRITICAL'
            ? 'animate-pulse'
            : ''
        }
      />

      <span>

        {priority || 'LOW'}

      </span>

    </span>
  );
};

export default PriorityBadge;