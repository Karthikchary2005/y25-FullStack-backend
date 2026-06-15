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
  StatusBadge
} from './StatusBadge';

import {
  PriorityBadge
} from './PriorityBadge';

import {
  formatRelativeTime
} from '../utils/dateUtils';

const STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED"
];

export const IssueTable = ({
  issues = []
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

  const handleDelete = async (
    issueId
  ) => {

    if (
      window.confirm(
        "Delete this issue?"
      )
    ) {

      await deleteIssue(
        issueId
      );
    }
  };

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

            {canVerifyIssue && (

              <th className="py-4 px-5 text-right">

                Actions

              </th>
            )}

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

                {canVerifyIssue && (

                  <td className="py-4.5 px-5">

                    <div className="flex items-center justify-end gap-2">

                      <select
                        value={issue.status || "OPEN"}
                        onChange={(event) =>
                          updateIssueStatus(
                            issue.id,
                            event.target.value
                          )
                        }
                        className="rounded-lg border border-white/10 bg-brand-dark px-2 py-1.5 text-[11px] font-semibold text-gray-200 outline-none focus:border-brand-secondary/50"
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
                        onClick={() =>
                          handleDelete(
                            issue.id
                          )
                        }
                        className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20"
                        title="Delete issue"
                      >

                        <Trash2 size={13} />

                      </button>

                    </div>

                  </td>
                )}

              </motion.tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
};

export default IssueTable;
