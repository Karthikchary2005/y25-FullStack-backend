import React, {
  useMemo,
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  Sparkles
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import {
  IssueTrendChart,
  PriorityDistributionChart
} from '../components/Charts';

import { StatusBadge } from '../components/StatusBadge';

import MotionWrapper, {
  MotionItem
} from '../components/MotionWrapper';

const Dashboard = () => {

  const [issues, setIssues] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { user } =
    useAuth();

  const canViewAllIssues = () => {

    const role =
      String(user?.role || "")
        .toUpperCase();

    return (
      role === "ADMIN" ||
      role === "TESTER"
    );
  };

  // LOAD ISSUES
  useEffect(() => {

    if(user){

      getIssues();
    }

  }, [user]);

  // GET ISSUES
  const getIssues = async () => {

    try {

      setLoading(true);

      let response;

      // ADMIN AND TESTER
      if(canViewAllIssues()) {

        response =
          await axios.get(

            "http://127.0.0.1:8000/authservice/issues"
          );

      } else {

        // NORMAL USER
        response =
          await axios.get(

            `http://127.0.0.1:8000/authservice/issues/user/${user.id}`
          );
      }

      console.log(response.data);

      setIssues(
        response.data.issues || []
      );

    } catch(error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // STATS
  const stats = useMemo(() => {

    const total =
      issues.length;

    const open =
      issues.filter(

        i =>
          i.status === 'OPEN'

      ).length;

    const progress =
      issues.filter(

        i =>
          i.status === 'IN_PROGRESS'

      ).length;

    const resolved =
      issues.filter(

        i =>
          i.status === 'RESOLVED'

      ).length;

    const closed =
      issues.filter(

        i =>
          i.status === 'CLOSED'

      ).length;

    return {

      total,
      open,
      progress,
      resolved,
      closed
    };

  }, [issues]);

  // CHART DATA
  const trendData =
    useMemo(() => {

      return [

        {
          name: 'Open',
          value: stats.open
        },

        {
          name: 'Progress',
          value: stats.progress
        },

        {
          name: 'Resolved',
          value: stats.resolved
        },

        {
          name: 'Closed',
          value: stats.closed
        }
      ];

    }, [stats]);

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

      {/* HERO */}
      <MotionItem
        className="glass-panel-glow rounded-2xl p-8"
      >

        <div className="space-y-4">

          <div className="inline-flex items-center gap-2 text-brand-secondary text-xs font-bold">

            <Sparkles size={12} />

            ISSUE TRACKING SYSTEM

          </div>

          <h1 className="text-4xl font-bold text-white">

            Welcome,
            {' '}
            {user?.name || 'User'}

          </h1>

          <p className="text-gray-400">

            Monitor and manage project issues.

          </p>

          <div className="flex gap-4">

            <Link
              to="/create-issue"
              className="px-4 py-2 bg-brand-primary rounded-lg text-white"
            >

              Create Issue

            </Link>

            <Link
              to="/issues"
              className="px-4 py-2 border border-white/10 rounded-lg text-white"
            >

              View Issues

            </Link>

          </div>

        </div>

      </MotionItem>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

        <MotionItem className="glass-panel rounded-xl p-4">

          <p className="text-gray-400 text-xs">

            TOTAL

          </p>

          <h2 className="text-3xl text-white font-bold">

            {stats.total}

          </h2>

        </MotionItem>

        <MotionItem className="glass-panel rounded-xl p-4">

          <p className="text-gray-400 text-xs">

            OPEN

          </p>

          <h2 className="text-3xl text-white font-bold">

            {stats.open}

          </h2>

        </MotionItem>

        <MotionItem className="glass-panel rounded-xl p-4">

          <p className="text-gray-400 text-xs">

            IN_PROGRESS

          </p>

          <h2 className="text-3xl text-white font-bold">

            {stats.progress}

          </h2>

        </MotionItem>

        <MotionItem className="glass-panel rounded-xl p-4">

          <p className="text-gray-400 text-xs">

            RESOLVED

          </p>

          <h2 className="text-3xl text-white font-bold">

            {stats.resolved}

          </h2>

        </MotionItem>

        <MotionItem className="glass-panel rounded-xl p-4">

          <p className="text-gray-400 text-xs">

            CLOSED

          </p>

          <h2 className="text-3xl text-white font-bold">

            {stats.closed}

          </h2>

        </MotionItem>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="glass-panel rounded-xl p-5">

          <h3 className="text-white font-bold mb-4">

            Issue Status

          </h3>

          <IssueTrendChart
            data={trendData}
          />

        </div>

        <div className="glass-panel rounded-xl p-5">

          <h3 className="text-white font-bold mb-4">

            Priority Distribution

          </h3>

          <PriorityDistributionChart
            data={priorityData}
          />

        </div>

      </div>

      {/* ISSUES */}
      <div className="glass-panel rounded-xl p-5">

        <h2 className="text-xl text-white font-bold mb-4">

          Recent Issues

        </h2>

        <div className="space-y-3">

          {issues.length === 0 ? (

            <div className="text-gray-400">

              No Issues Found

            </div>

          ) : (

            issues.map(issue => (

              <div
                key={issue.id}
                className="p-4 rounded-lg border border-white/10 bg-brand-dark/40 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-white font-semibold">

                    {issue.title}

                  </h3>

                  <p className="text-xs text-gray-400">

                    {issue.category}

                  </p>

                </div>

                <StatusBadge
                  status={issue.status}
                />

              </div>
            ))
          )}

        </div>

      </div>

    </MotionWrapper>
  );
};

export default Dashboard;
