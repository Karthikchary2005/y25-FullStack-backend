import React, {
  useMemo,
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  ShieldAlert,
  Wrench,
  Tag,
  CheckCircle,
  Trash2
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import { PriorityDistributionChart } from '../components/Charts';

import { PriorityBadge } from '../components/PriorityBadge';

import MotionWrapper, {
  MotionItem
} from '../components/MotionWrapper';

const AdminPanel = () => {

  const [issues, setIssues] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const { user } =
    useAuth();

  // LOAD DATA
  useEffect(() => {

    getIssues();

    getUsers();

  }, []);

  // GET ISSUES
  const getIssues = async () => {

    try {

      const response =
        await axios.get(

          "http://127.0.0.1:8000/authservice/issues"
        );

      console.log(response.data);

      setIssues(
        response.data.issues || []
      );

    } catch(error) {

      console.log(error);
    }
  };

  // GET USERS
  const getUsers = async () => {

    try {

      const response =
        await axios.get(

          "http://127.0.0.1:8000/authservice/users"
        );

      console.log(response.data);

      setUsers(
        response.data.users || []
      );

    } catch(error) {

      console.log(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (
    issueId,
    status
  ) => {

    try {

      await axios.put(

        `http://127.0.0.1:8000/authservice/updatestatus/${issueId}`,

        {
          status
        }
      );

      alert(
        "Status Updated"
      );

      getIssues();

    } catch(error) {

      console.log(error);
    }
  };

  // DELETE ISSUE
  const deleteIssue = async (
    issueId
  ) => {

    try {

      await axios.delete(

        `http://127.0.0.1:8000/authservice/deleteissue/${issueId}`
      );

      alert(
        "Issue Deleted"
      );

      getIssues();

    } catch(error) {

      console.log(error);
    }
  };

  // PRIORITY DATA
  const priorityData =
    useMemo(() => {

      const priorityColors = {

        LOW: '#10b981',

        MEDIUM: '#eab308',

        HIGH: '#f97316',

        CRITICAL: '#ef4444'
      };

      return [

        'LOW',
        'MEDIUM',
        'HIGH',
        'CRITICAL'

      ].map(level => {

        const count =
          issues.filter(

            i =>
              i.priority === level
          ).length;

        return {

          name: level,

          count,

          fill:
            priorityColors[level]
        };
      });

    }, [issues]);

  return (

    <MotionWrapper className="p-6 space-y-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="border-b border-white/5 pb-5">

        <span className="text-[10px] uppercase font-mono tracking-widest text-brand-primary font-bold flex items-center gap-1.5">

          <ShieldAlert size={12} />

          ADMIN CONTROL PANEL

        </span>

        <h1 className="text-3xl font-bold text-white mt-2">

          Admin Dashboard

        </h1>

      </div>

      {/* USERS */}
      <div className="glass-panel rounded-xl p-5 space-y-4">

        <h3 className="text-white font-bold">

          Registered Users

        </h3>

        <div className="space-y-3">

          {users.map(usr => (

            <div
              key={usr.id}
              className="p-3 rounded-lg bg-brand-dark/40 border border-white/10 flex justify-between items-center"
            >

              <div>

                <p className="text-white font-semibold">

                  {usr.name}

                </p>

                <p className="text-xs text-gray-400">

                  {usr.email}

                </p>

              </div>

              <div className="text-xs text-brand-secondary">

                {usr.role}

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* ISSUES */}
      <div className="glass-panel rounded-xl p-5 space-y-4">

        <h3 className="text-base font-bold text-white flex items-center gap-2">

          <Wrench size={16} />

          Issue Management

        </h3>

        {issues.length === 0 ? (

          <div className="text-center py-10 text-gray-400">

            <CheckCircle
              size={30}
              className="mx-auto mb-3 text-green-400"
            />

            No Issues Found

          </div>

        ) : (

          <div className="space-y-3">

            {issues.map(issue => (

              <div
                key={issue.id}
                className="p-4 rounded-lg bg-brand-dark/40 border border-white/10 flex flex-col md:flex-row justify-between gap-4"
              >

                <div>

                  <Link
                    to={`/issues/${issue.id}`}
                    className="text-white font-semibold hover:text-brand-secondary"
                  >

                    {issue.title}

                  </Link>

                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">

                    <span className="flex items-center gap-1">

                      <Tag size={10} />

                      {issue.category}

                    </span>

                  </div>

                </div>

                <div className="flex items-center gap-3 flex-wrap">

                  <PriorityBadge
                    priority={issue.priority}
                  />

                  <select

                    onChange={(e) =>
                      updateStatus(
                        issue.id,
                        e.target.value
                      )
                    }

                    value={issue.status}

                    className="bg-brand-dark border border-white/10 rounded px-2 py-1 text-white text-xs"
                  >

                    <option value="OPEN">
                      OPEN
                    </option>

                    <option value="IN_PROGRESS">
                      IN_PROGRESS
                    </option>

                    <option value="RESOLVED">
                      RESOLVED
                    </option>

                    <option value="CLOSED">
                      CLOSED
                    </option>

                  </select>

                  <button

                    onClick={() =>
                      deleteIssue(issue.id)
                    }

                    className="p-2 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  >

                    <Trash2 size={14} />

                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* CHART */}
      <div className="glass-panel rounded-xl p-5">

        <h3 className="text-base font-bold text-white mb-4">

          Priority Distribution

        </h3>

        <PriorityDistributionChart
          data={priorityData}
        />

      </div>

    </MotionWrapper>
  );
};

export default AdminPanel;