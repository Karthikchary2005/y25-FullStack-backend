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
  Edit3,
  Save,
  Trash2,
  X
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

import { StatusBadge } from '../components/StatusBadge';

import { PriorityBadge } from '../components/PriorityBadge';

import MotionWrapper from '../components/MotionWrapper';

const CATEGORIES = [
  "UI Bug",
  "Backend",
  "Authentication",
  "Performance",
  "Database",
  "Security",
  "API",
  "Deployment"
];

const PRIORITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL"
];

const STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED"
];

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

  const [editing, setEditing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      category: CATEGORIES[0],
      priority: PRIORITIES[1],
      status: STATUSES[0]
    });

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

  const role =
    String(user?.role || "")
      .toUpperCase();

  const canEditIssue =
    role === "ADMIN" ||
    String(issue?.createdBy) === String(user?.id);

  const canVerifyIssue =
    role === "ADMIN" ||
    role === "TESTER";

  const canUpdateStatus =
    canEditIssue ||
    canVerifyIssue;

  const canDeleteIssue =
    canEditIssue ||
    canVerifyIssue;

  useEffect(() => {

    if(issue){

      setForm({
        title: issue.title || "",
        description: issue.description || "",
        category: issue.category || CATEGORIES[0],
        priority: issue.priority || PRIORITIES[1],
        status: issue.status || STATUSES[0]
      });
    }

  }, [issue]);

  const handleFormChange = (
    key,
    value
  ) => {

    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // UPDATE STATUS
  const handleStatusClick = async (
    status
  ) => {

    try {

      await axios.put(

        `http://127.0.0.1:8000/authservice/updatestatus/${issue.id}`,

        {
          status
        },

        {
          headers: {
            Token:
              localStorage.getItem(
                "token"
              ) || ""
          }
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

  // SAVE EDIT
  const handleSave = async () => {

    if(
      !form.title.trim() ||
      !form.description.trim()
    ){

      alert(
        "Title and description are required"
      );

      return;
    }

    try {

      setSaving(true);

      const response =
        await axios.put(

          `http://127.0.0.1:8000/authservice/updateissue/${issue.id}`,

          {
            ...form,
            updatedBy: user?.id
          },

          {
            headers: {
              Token:
                localStorage.getItem(
                  "token"
                ) || ""
            }
          }
        );

      if(response.data.code === 200){

        alert(
          "Issue Updated"
        );

        setEditing(false);

        getIssues();

      } else {

        alert(
          response.data.message ||
          "Issue update failed"
        );
      }

    } catch(error) {

      console.log(error);

      alert(
        "Issue update failed"
      );

    } finally {

      setSaving(false);
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

          `http://127.0.0.1:8000/authservice/deleteissue/${issue.id}`,

          {
            headers: {
              Token:
                localStorage.getItem(
                  "token"
                ) || ""
            }
          }
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

        {(canEditIssue || canDeleteIssue) && (

          <div className="flex items-center gap-3">

            {canEditIssue && editing ? (

              <>

                <button

                  onClick={() =>
                    setEditing(false)
                  }

                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
                >

                  <X size={14} />

                  Cancel

                </button>

                <button

                  onClick={handleSave}

                  disabled={saving}

                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white"
                >

                  <Save size={14} />

                  {saving ? "Saving" : "Save"}

                </button>

              </>

            ) : canEditIssue ? (

              <button

                onClick={() =>
                  setEditing(true)
                }

                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
              >

                <Edit3 size={14} />

                Edit

              </button>
            ) : null}

            {canDeleteIssue && (

              <button

                onClick={handleDelete}

                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
              >

                <Trash2 size={14} />

                Delete

              </button>
            )}

          </div>
        )}

      </div>

      {/* ISSUE CARD */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">

        {/* TOP */}
        <div className="flex justify-between flex-wrap gap-4">

          <div className="space-y-2">

            {editing ? (

              <input

                value={form.title}

                onChange={(e) =>
                  handleFormChange(
                    "title",
                    e.target.value
                  )
                }

                className="w-full bg-brand-dark/40 border border-white/10 rounded-lg px-4 py-3 text-2xl font-bold text-white"
              />

            ) : (

              <h1 className="text-3xl font-bold text-white">

              {issue.title}

              </h1>
            )}

            {editing ? (

              <select

                value={form.category}

                onChange={(e) =>
                  handleFormChange(
                    "category",
                    e.target.value
                  )
                }

                className="bg-brand-dark/40 border border-white/10 rounded-lg px-3 py-2 text-gray-200"
              >

                {CATEGORIES.map(category => (

                  <option
                    key={category}
                    value={category}
                  >

                    {category}

                  </option>
                ))}

              </select>

            ) : (

              <p className="text-gray-400">

                {issue.category}

              </p>
            )}

          </div>

          <div className="flex items-center gap-3">

            {editing ? (

              <>

                <select

                  value={form.status}

                  onChange={(e) =>
                    handleFormChange(
                      "status",
                      e.target.value
                    )
                  }

                  className="bg-brand-dark/40 border border-white/10 rounded-lg px-3 py-2 text-gray-200"
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

                <select

                  value={form.priority}

                  onChange={(e) =>
                    handleFormChange(
                      "priority",
                      e.target.value
                    )
                  }

                  className="bg-brand-dark/40 border border-white/10 rounded-lg px-3 py-2 text-gray-200"
                >

                  {PRIORITIES.map(priority => (

                    <option
                      key={priority}
                      value={priority}
                    >

                      {priority}

                    </option>
                  ))}

                </select>

              </>

            ) : (

              <>

                <StatusBadge
                  status={issue.status}
                />

                <PriorityBadge
                  priority={issue.priority}
                />

              </>
            )}

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="p-5 rounded-xl bg-brand-dark/30 border border-white/10">

          {editing ? (

            <textarea

              rows={6}

              value={form.description}

              onChange={(e) =>
                handleFormChange(
                  "description",
                  e.target.value
                )
              }

              className="w-full bg-brand-dark/40 border border-white/10 rounded-lg px-4 py-3 text-gray-200"
            />

          ) : (

            <p className="text-gray-300 leading-relaxed">

              {issue.description}

            </p>
          )}

        </div>

        {/* STATUS CONTROLS */}
        {canUpdateStatus && !editing && (

          <div className="space-y-3 border-t border-white/10 pt-5">

            <h3 className="text-white font-bold">

              Update Status

            </h3>

            <div className="flex flex-wrap gap-3">

              {STATUSES.map(status => (

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
