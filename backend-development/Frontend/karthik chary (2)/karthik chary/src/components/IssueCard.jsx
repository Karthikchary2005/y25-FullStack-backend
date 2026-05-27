import React from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  Calendar,
  Tag,
  User
} from 'lucide-react';

import {
  PriorityBadge
} from './PriorityBadge';

import {
  formatRelativeTime
} from '../utils/dateUtils';

import {
  TiltWrapper
} from './TiltWrapper';


export const IssueCard = ({
  issue
}) => {

  // SAFE USER NAME
  const creatorName =

    issue?.userName ||

    issue?.createdBy ||

    "Unknown User";


  return (

    <TiltWrapper
      maxTilt={12}
      className="h-full"
    >

      <motion.div

        whileHover={{
          y: -4
        }}

        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}

        className="glass-panel hover:glass-panel-glow transition-all duration-300 rounded-xl p-4.5 flex flex-col justify-between h-full group relative select-none cursor-pointer"
      >

        {/* FULL LINK */}
        <Link

          to={`/issues/${issue.id}`}

          className="absolute inset-0 z-10"
        />

        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">

          <div className="flex items-center gap-2">

            {/* ID */}
            <span className="text-[10px] font-mono font-bold text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">

              #{issue.id}

            </span>

            {/* CATEGORY */}
            <span className="text-[10px] font-semibold text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded flex items-center gap-1">

              <Tag size={8} />

              {issue.category || "General"}

            </span>

          </div>

          {/* PRIORITY */}
          <PriorityBadge
            priority={issue.priority}
          />

        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-1 z-20 pointer-events-none">

          {/* TITLE */}
          <h4 className="text-sm font-semibold text-white group-hover:text-brand-secondary transition-colors line-clamp-1">

            {issue.title || "Untitled Issue"}

          </h4>

          {/* DESCRIPTION */}
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">

            {issue.description || "No description provided."}

          </p>

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3 z-20">

          {/* USER */}
          <div className="flex items-center gap-2">

            <div className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">

              <User size={10} />

            </div>

            <span className="text-[11px] font-medium text-gray-400">

              {creatorName}

            </span>

          </div>

          {/* DATE */}
          <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono">

            <span className="flex items-center gap-1">

              <Calendar size={11} />

              {formatRelativeTime(
                issue.createdAt
              )}

            </span>

          </div>

        </div>

      </motion.div>

    </TiltWrapper>
  );
};

export default IssueCard;