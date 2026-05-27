import React from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  Calendar,
  Tag,
  User
} from 'lucide-react';

import {
  StatusBadge
} from './StatusBadge';

import {
  PriorityBadge
} from './PriorityBadge';

import {
  formatRelativeTime
} from '../utils/dateUtils';


export const IssueTable = ({
  issues = []
}) => {

  return (

    <div className="w-full overflow-x-auto rounded-xl bg-brand-card border border-white/5 shadow-glass backdrop-blur-md">

      <table className="w-full text-left border-collapse">

        {/* HEADER */}
        <thead>

          <tr className="border-b border-white/5 bg-brand-dark/40 text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-400">

            <th className="py-4 px-5">

              ID

            </th>

            <th className="py-4 px-4">

              Title

            </th>

            <th className="py-4 px-4">

              Status

            </th>

            <th className="py-4 px-4">

              Priority

            </th>

            <th className="py-4 px-4">

              Category

            </th>

            <th className="py-4 px-4">

              Created By

            </th>

            <th className="py-4 px-5 text-right">

              Created

            </th>

          </tr>

        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-white/5">

          {issues.map((issue) => {

            const creatorName =

              issue?.userName ||

              issue?.createdBy ||

              "Unknown User";

            return (

              <motion.tr

                key={issue.id}

                whileHover={{
                  backgroundColor:
                    "rgba(255,255,255,0.02)"
                }}

                className="transition-colors duration-150 relative text-xs hover:text-white"
              >

                {/* ID */}
                <td className="py-4.5 px-5 font-mono font-bold text-gray-400">

                  <Link

                    to={`/issues/${issue.id}`}

                    className="hover:text-brand-secondary"
                  >

                    #{issue.id}

                  </Link>

                </td>

                {/* TITLE */}
                <td className="py-4.5 px-4 font-semibold text-white max-w-xs md:max-w-md truncate">

                  <Link

                    to={`/issues/${issue.id}`}

                    className="hover:underline flex items-center gap-2"
                  >

                    <span>

                      {issue.title || "Untitled Issue"}

                    </span>

                  </Link>

                </td>

                {/* STATUS */}
                <td className="py-4.5 px-4">

                  <StatusBadge
                    status={issue.status}
                  />

                </td>

                {/* PRIORITY */}
                <td className="py-4.5 px-4">

                  <PriorityBadge
                    priority={issue.priority}
                  />

                </td>

                {/* CATEGORY */}
                <td className="py-4.5 px-4">

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-secondary">

                    <Tag size={10} />

                    {issue.category || "General"}

                  </span>

                </td>

                {/* USER */}
                <td className="py-4.5 px-4">

                  <div className="flex items-center gap-2">

                    <div className="w-5.5 h-5.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">

                      <User size={8} />

                    </div>

                    <span className="font-medium text-gray-400">

                      {creatorName}

                    </span>

                  </div>

                </td>

                {/* DATE */}
                <td className="py-4.5 px-5 text-right font-mono text-gray-500">

                  <div className="flex items-center justify-end gap-1">

                    <Calendar size={10} />

                    {formatRelativeTime(
                      issue.createdAt
                    )}

                  </div>

                </td>

              </motion.tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
};

export default IssueTable;