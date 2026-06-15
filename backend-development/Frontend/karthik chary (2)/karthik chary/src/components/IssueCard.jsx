import React from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  Calendar,
  Tag,
  Trash2,
  User
} from 'lucide-react';

import {
  useAuth
} from '../context/AuthContext';

import {
  useIssues
} from '../context/IssueContext';

import {
  PriorityBadge
} from './PriorityBadge';

import {
  formatRelativeTime
} from '../utils/dateUtils';

import {
  TiltWrapper
} from './TiltWrapper';

const STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED"
];

export const IssueCard = ({
  issue
}) => {

  const {
    user
  } = useAuth();

  const {
    updateIssueStatus,
    deleteIssue
  } = useIssues();

  const role =
    String(user?.role || "")
      .toUpperCase();

  const canVerifyIssue =
    role === "ADMIN" ||
    role === "TESTER";

  // SAFE USER NAME
  const creatorName =

    issue?.userName ||

    issue?.createdBy ||

    "Unknown User";

  const handleDelete = async (event) => {

    event.preventDefault();

    event.stopPropagation();

    if (
      window.confirm(
        "Delete this issue?"
      )
    ) {

      await deleteIssue(
        issue.id
      );
    }
  };

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

        {canVerifyIssue && (

          <div className="mt-3 flex items-center gap-2 z-30 relative">

            <select
              value={issue.status || "OPEN"}
              onChange={(event) =>
                updateIssueStatus(
                  issue.id,
                  event.target.value
                )
              }
              onClick={(event) =>
                event.stopPropagation()
              }
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-brand-dark/90 px-2 py-1.5 text-[11px] font-semibold text-gray-200 outline-none focus:border-brand-secondary/50"
            >

              {STATUSES.map(status => (

                <option
                  key={status}
                  value={status}
                >

                  {status}

                </option>
              ))}

            </select>

            <button
              onClick={handleDelete}
              className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20"
              title="Delete issue"
            >

              <Trash2 size={13} />

            </button>

          </div>
        )}

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
