import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import {
  Sparkles,
  UploadCloud,
  AlertCircle,
  ArrowRight,
  CheckCircle,
  FileImage
} from 'lucide-react';

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

const CreateIssue = () => {

  const [title, setTitle] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [category, setCategory] =
    useState(CATEGORIES[0]);

  const [priority, setPriority] =
    useState(PRIORITIES[1]);

  const [uploading, setUploading] =
    useState(false);

  const [attachment, setAttachment] =
    useState(null);

  const [dragActive, setDragActive] =
    useState(false);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState(false);

  const navigate =
    useNavigate();

  // DRAG EVENTS
  const handleDrag = (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (

      e.type === "dragenter" ||

      e.type === "dragover"

    ) {

      setDragActive(true);

    } else {

      setDragActive(false);
    }
  };

  // DROP FILE
  const handleDrop = (e) => {

    e.preventDefault();

    e.stopPropagation();

    setDragActive(false);

    if (

      e.dataTransfer.files &&

      e.dataTransfer.files[0]

    ) {

      simulateFileUpload(
        e.dataTransfer.files[0]
      );
    }
  };

  // FILE CHANGE
  const handleFileChange = (e) => {

    if (

      e.target.files &&

      e.target.files[0]

    ) {

      simulateFileUpload(
        e.target.files[0]
      );
    }
  };

  // MOCK FILE UPLOAD
  const simulateFileUpload = () => {

    setUploading(true);

    setTimeout(() => {

      setAttachment(
        "uploaded"
      );

      setUploading(false);

    }, 1500);
  };

  // SUBMIT ISSUE
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      !title ||

      !description

    ) {

      setError(
        "Please fill all fields."
      );

      return;
    }

    try {

      setError('');

      const storedUser =
        JSON.parse(

          localStorage.getItem(
            "user"
          )
        );

      if(!storedUser){

        setError(
          "Please login again."
        );

        return;
      }

      const data = {

        title,

        description,

        category,

        priority,

        createdBy:
          storedUser.id
      };

      const response =
        await axios.post(

          "http://127.0.0.1:8000/authservice/createissue",

          data
        );

      console.log(
        response.data
      );

      if(

        response.data.code === 200

      ){

        setSuccess(true);

        alert(
          "Issue Created Successfully"
        );

        setTimeout(() => {

          navigate('/issues');

        }, 1000);

      } else {

        setError(

          response.data.message ||

          "Issue creation failed."
        );
      }

    } catch(error) {

      console.log(error);

      setError(
        "Failed to create issue."
      );
    }
  };

  return (

    <MotionWrapper className="p-6 space-y-6 max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="border-b border-white/5 pb-5">

        <span className="text-[10px] uppercase font-mono tracking-widest text-brand-secondary font-bold flex items-center gap-1.5">

          <Sparkles size={12} />

          ISSUE REPORT SYSTEM

        </span>

        <h1 className="text-3xl font-bold text-white mt-1">

          Create New Issue

        </h1>

        <p className="text-sm text-gray-400">

          Report and track project issues.

        </p>

      </div>

      {/* FORM */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">

        {error && (

          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2 text-sm">

            <AlertCircle size={15} />

            {error}

          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TITLE */}
          <div className="space-y-2">

            <label className="text-xs text-gray-300 font-semibold">

              ISSUE TITLE

            </label>

            <input

              type="text"

              required

              value={title}

              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }

              className="w-full bg-brand-dark/40 border border-white/10 rounded-lg px-4 py-3 text-white"

              placeholder="Enter issue title"
            />

          </div>

          {/* CATEGORY + PRIORITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* CATEGORY */}
            <div className="space-y-2">

              <label className="text-xs text-gray-300 font-semibold">

                CATEGORY

              </label>

              <select

                value={category}

                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }

                className="w-full bg-brand-dark/40 border border-white/10 rounded-lg px-4 py-3 text-white"
              >

                {CATEGORIES.map(cat => (

                  <option
                    key={cat}
                    value={cat}
                  >

                    {cat}

                  </option>
                ))}

              </select>

            </div>

            {/* PRIORITY */}
            <div className="space-y-2">

              <label className="text-xs text-gray-300 font-semibold">

                PRIORITY

              </label>

              <select

                value={priority}

                onChange={(e) =>
                  setPriority(
                    e.target.value
                  )
                }

                className="w-full bg-brand-dark/40 border border-white/10 rounded-lg px-4 py-3 text-white"
              >

                {PRIORITIES.map(level => (

                  <option
                    key={level}
                    value={level}
                  >

                    {level}

                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">

            <label className="text-xs text-gray-300 font-semibold">

              DESCRIPTION

            </label>

            <textarea

              required

              rows={5}

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              className="w-full bg-brand-dark/40 border border-white/10 rounded-lg px-4 py-3 text-white"

              placeholder="Describe the issue"
            />

          </div>

          {/* FILE UPLOAD */}
          <div className="space-y-2">

            <label className="text-xs text-gray-300 font-semibold">

              ATTACHMENT

            </label>

            <div

              onDragEnter={handleDrag}

              onDragLeave={handleDrag}

              onDragOver={handleDrag}

              onDrop={handleDrop}

              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive
                  ? 'border-brand-secondary'
                  : 'border-white/10'
              }`}
            >

              <input

                type="file"

                id="file-upload"

                onChange={handleFileChange}

                className="hidden"
              />

              <label
                htmlFor="file-upload"
                className="cursor-pointer"
              >

                {uploading ? (

                  <div className="space-y-2">

                    <div className="w-8 h-8 mx-auto rounded-full border-2 border-brand-secondary border-t-transparent animate-spin"></div>

                    <p className="text-xs text-brand-secondary">

                      Uploading...

                    </p>

                  </div>

                ) : attachment ? (

                  <div className="space-y-2 text-green-400">

                    <FileImage
                      size={28}
                      className="mx-auto"
                    />

                    <p className="text-xs">

                      File Uploaded
                    </p>

                  </div>

                ) : (

                  <div className="space-y-2 text-gray-400">

                    <UploadCloud
                      size={30}
                      className="mx-auto"
                    />

                    <p className="text-xs">

                      Click or drag file here

                    </p>

                  </div>

                )}

              </label>

            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">

            <button

              type="button"

              onClick={() =>
                navigate('/issues')
              }

              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400"
            >

              Cancel

            </button>

            <button

              type="submit"

              disabled={
                success ||
                uploading
              }

              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary text-white"
            >

              {success ? (

                <>

                  <CheckCircle size={14} />

                  Created

                </>

              ) : (

                <>

                  Create Issue

                  <ArrowRight size={14} />

                </>

              )}

            </button>

          </div>

        </form>

      </div>

    </MotionWrapper>
  );
};

export default CreateIssue;