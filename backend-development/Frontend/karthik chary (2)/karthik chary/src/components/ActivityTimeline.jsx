import React from 'react';

import { motion } from 'framer-motion';

import {
  PlusCircle,
  UserPlus,
  MessageSquare,
  CheckCircle2,
  Info
} from 'lucide-react';

import {
  formatRelativeTime
} from '../utils/dateUtils';


// CONTAINER ANIMATION
const containerVariants = {

  animate: {

    transition: {

      staggerChildren: 0.1
    }
  }
};


// ITEM ANIMATION
const itemVariants = {

  initial: {

    opacity: 0,

    x: -10
  },

  animate: {

    opacity: 1,

    x: 0,

    transition: {

      duration: 0.4,

      ease: "easeOut"
    }
  }
};


export const ActivityTimeline = ({
  activities = []
}) => {

  // ACTION ICONS
  const getActionIcon = (action) => {

    switch (action) {

      case 'created':

        return {

          icon: PlusCircle,

          color: 'text-blue-400',

          bg: 'bg-blue-500/10 border-blue-500/20'
        };

      case 'assigned':

        return {

          icon: UserPlus,

          color: 'text-violet-400',

          bg: 'bg-violet-500/10 border-violet-500/20'
        };

      case 'commented':

        return {

          icon: MessageSquare,

          color: 'text-cyan-400',

          bg: 'bg-cyan-500/10 border-cyan-500/20'
        };

      case 'resolved':

      case 'status_changed':

        return {

          icon: CheckCircle2,

          color: 'text-emerald-400',

          bg: 'bg-emerald-500/10 border-emerald-500/20'
        };

      default:

        return {

          icon: Info,

          color: 'text-gray-400',

          bg: 'bg-gray-500/10 border-gray-500/20'
        };
    }
  };


  // SAFE SORT
  const sortedActivities =
    [...activities].sort(

      (a, b) => {

        const dateA =

          a?.createdAt
            ? new Date(a.createdAt)
            : new Date(0);

        const dateB =

          b?.createdAt
            ? new Date(b.createdAt)
            : new Date(0);

        return dateB - dateA;
      }
    );


  // EMPTY STATE
  if (

    sortedActivities.length === 0

  ) {

    return (

      <div className="text-center py-6 text-gray-500 text-sm">

        No recent activities recorded.

      </div>
    );
  }


  return (

    <motion.div

      className="relative pl-6 border-l border-white/5 space-y-6"

      variants={containerVariants}

      initial="initial"

      animate="animate"
    >

      {sortedActivities.map(

        (act, index) => {

          const iconConfig =
            getActionIcon(
              act.action
            );

          const Icon =
            iconConfig.icon;

          return (

            <motion.div

              key={
                act.id || index
              }

              className="relative"

              variants={itemVariants}
            >

              {/* TIMELINE ICON */}
              <span className={`absolute -left-[35px] top-0.5 w-6 h-6 rounded-full border flex items-center justify-center ${iconConfig.bg} shadow-sm z-10 bg-brand-bg`}>

                <Icon
                  size={12}
                  className={
                    iconConfig.color
                  }
                />

              </span>

              {/* CONTENT */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">

                <div>

                  <p className="text-sm text-gray-200">

                    <span className="font-semibold text-white">

                      {act.userName || "Unknown User"}

                    </span>

                    {' '}

                    <span className="text-gray-400">

                      {act.details || "performed an action"}

                    </span>

                  </p>

                </div>

                <span className="text-[10px] text-gray-500 font-mono self-start md:self-center">

                  {formatRelativeTime(
                    act.createdAt
                  )}

                </span>

              </div>

            </motion.div>
          );
        }
      )}

    </motion.div>
  );
};

export default ActivityTimeline;