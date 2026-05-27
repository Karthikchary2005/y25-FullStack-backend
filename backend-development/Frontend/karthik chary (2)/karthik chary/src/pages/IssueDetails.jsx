import React, {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useParams,
  Link,
  useNavigate
} from 'react-router-dom';

import axios from 'axios';

import {
  ArrowLeft,
  Trash2
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

import { StatusBadge } from '../components/StatusBadge';

import { PriorityBadge } from '../components/PriorityBadge';

import MotionWrapper from '../components/MotionWrapper';

const IssueDetails = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const [issues, setIssues] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // LOAD ISSUES
  useEffect(() => {

    getIssues();

  }, []);

  // GET ISSUES
  const getIssues = async () => {

    try {

      setLoading(true);

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

    } finally {

      setLoading(false);
    }
  };

  // CURRENT ISSUE
  const issue =
    useMemo(() => {

      return issues.find(

        iss =>
          String(iss.id) === String(id)
      );

    }, [issues, id]);

  // UPDATE STATUS
  const handleStatusClick = async (
    status
  ) => {

    try {

      await axios.put(

        `http://127.0.0.1:8000/authservice/updatestatus/${issue.id}`,

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
  const handleDelete = async () => {

    if(

      window.confirm(
        "Delete this issue?"
      )

    ) {

      try {

        await axios.delete(

          `http://127.0.0.1:8000/authservice/deleteissue/${issue.id}`
        );

        alert(
          "Issue Deleted"
        );

        navigate('/issues');

      } catch(error) {

        console.log(error);
      }
    }
  };

  // LOADING
  if(loading){

    return (

      <div className="p-10 text-center text-white">

        Loading...

      </div>
    );
  }

  // NOT FOUND
  if (!issue) {

    return (

      <div className="p-10 text-center space-y-4">

        <h2 className="text-2xl font-bold text-white">

          Issue Not Found

        </h2>

        <Link
          to="/issues"
          className="text-brand-secondary"
        >

          Back to Issues

        </Link>

      </div>
    );
  }

  return (

    <MotionWrapper className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <Link
          to="/issues"
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >

          <ArrowLeft size={16} />

          Back

        </Link>

        {user?.role === "ADMIN" && (

          <button

            onClick={handleDelete}

            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
          >

            <Trash2 size={14} />

            Delete

          </button>
        )}

      </div>

      {/* ISSUE CARD */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">

        {/* TOP */}
        <div className="flex justify-between flex-wrap gap-4">

          <div className="space-y-2">

            <h1 className="text-3xl font-bold text-white">

              {issue.title}

            </h1>

            <p className="text-gray-400">

              {issue.category}

            </p>

          </div>

          <div className="flex items-center gap-3">

            <StatusBadge
              status={issue.status}
            />

            <PriorityBadge
              priority={issue.priority}
            />

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="p-5 rounded-xl bg-brand-dark/30 border border-white/10">

          <p className="text-gray-300 leading-relaxed">

            {issue.description}

          </p>

        </div>

        {/* STATUS CONTROLS */}
        {user?.role === "ADMIN" && (

          <div className="space-y-3 border-t border-white/10 pt-5">

            <h3 className="text-white font-bold">

              Update Status

            </h3>

            <div className="flex flex-wrap gap-3">

              {[
                'OPEN',
                'IN_PROGRESS',
                'RESOLVED',
                'CLOSED'
              ].map(status => (

                <button

                  key={status}

                  onClick={() =>
                    handleStatusClick(
                      status
                    )
                  }

                  className={`px-4 py-2 rounded-lg border text-sm ${
                    issue.status === status
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-white/5 border-white/10 text-gray-300'
                  }`}
                >

                  {status}

                </button>
              ))}

            </div>

          </div>
        )}

      </div>

    </MotionWrapper>
  );
};

export default IssueDetails;