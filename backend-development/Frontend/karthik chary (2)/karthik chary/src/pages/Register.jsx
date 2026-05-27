import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import axios from 'axios';

import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Bug,
  AlertCircle
} from 'lucide-react';

import MotionWrapper from '../components/MotionWrapper';

export const Register = () => {

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  // REGISTER
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      setError(
        "Please complete all fields."
      );

      return;
    }

    if(password.length < 4){

      setError(
        "Password must be at least 4 characters."
      );

      return;
    }

    if(password !== confirmPassword){

      setError(
        "Passwords do not match."
      );

      return;
    }

    try {

      setError('');

      setLoading(true);

      const response =
        await axios.post(

          "http://127.0.0.1:8000/authservice/signup",

          {
            name,
            email,
            password
          }
        );

      console.log(response.data);

      if(
        response.data.code === 200
      ){

        alert(
          "Registration Successful"
        );

        navigate('/login');

      } else {

        setError(
          response.data.message
        );
      }

    } catch(error) {

      console.log(error);

      setError(
        "Backend Connection Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <MotionWrapper className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#02050f] text-gray-200">

      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-brand-dark to-[#030208] border-r border-white/5 relative overflow-hidden select-none">

        <div className="absolute inset-0 cyber-grid-overlay opacity-20"></div>

        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-brand-primary/10 rounded-full blur-[100px]"></div>

        <div className="flex items-center gap-1.5 z-10 text-xs text-brand-secondary font-mono">

          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse"></span>

          SECURE REGISTRATION ACTIVE

        </div>

        {/* INFO CARD */}
        <div className="z-10 w-full max-w-sm mx-auto glass-panel-glow border-brand-primary/20 rounded-xl p-6 shadow-glass-lg relative flex flex-col font-mono text-xs">

          <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">

            <span>
              AUTH SYSTEM ONLINE
            </span>

          </div>

          <div className="space-y-3.5 text-gray-400">

            <div className="flex items-center gap-3">

              <div className="w-6.5 h-6.5 rounded bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold">

                1

              </div>

              <span>
                PostgreSQL Database
              </span>

            </div>

            <div className="flex items-center gap-3">

              <div className="w-6.5 h-6.5 rounded bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold">

                2

              </div>

              <span>
                JWT Authentication
              </span>

            </div>

            <div className="flex items-center gap-3">

              <div className="w-6.5 h-6.5 rounded bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold">

                3

              </div>

              <span>
                Role-Based Access
              </span>

            </div>

          </div>

        </div>

        {/* TEXT */}
        <div className="z-10 max-w-md">

          <span className="text-[10px] uppercase font-mono tracking-widest text-brand-primary font-bold">

            JOIN THE PLATFORM

          </span>

          <h3 className="text-2xl font-bold font-display text-white mt-1 leading-tight">

            Create your developer account.

          </h3>

          <p className="text-xs text-gray-400 mt-2">

            Start managing issues and workflows in real time.

          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center p-8 relative overflow-hidden">

        <div className="absolute inset-0 cyber-grid-overlay opacity-10"></div>

        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.6
          }}

          className="w-full max-w-md space-y-6 z-10"
        >

          {/* HEADER */}
          <div className="text-center lg:text-left space-y-2">

            <div className="inline-flex items-center gap-3 justify-center lg:justify-start">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-glow-cyan">

                <Bug className="w-5 h-5 text-white animate-pulse" />

              </div>

              <span className="font-display font-bold text-2xl tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">

                RESOLVE
                <span className="text-brand-secondary">
                  .AI
                </span>

              </span>

            </div>

            <div>

              <h2 className="text-2xl font-bold font-display text-white">

                Create Account

              </h2>

              <p className="text-sm text-gray-400">

                Initialize a new secure profile.

              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="glass-panel rounded-2xl p-6 shadow-glass space-y-4">

            {error && (

              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 flex items-center gap-2">

                <AlertCircle size={14} />

                <span>{error}</span>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >

              {/* NAME */}
              <div className="space-y-1">

                <label className="text-[10px] font-semibold text-gray-400 font-mono">

                  FULL NAME

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">

                    <User size={15} />

                  </div>

                  <input

                    type="text"

                    required

                    value={name}

                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }

                    placeholder="Karthik"

                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-brand-dark/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div className="space-y-1">

                <label className="text-[10px] font-semibold text-gray-400 font-mono">

                  EMAIL ADDRESS

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">

                    <Mail size={15} />

                  </div>

                  <input

                    type="email"

                    required

                    value={email}

                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }

                    placeholder="karthik@gmail.com"

                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-brand-dark/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="space-y-1">

                <label className="text-[10px] font-semibold text-gray-400 font-mono">

                  PASSWORD

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">

                    <Lock size={15} />

                  </div>

                  <input

                    type="password"

                    required

                    value={password}

                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }

                    placeholder="••••••••"

                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-brand-dark/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
                  />

                </div>

              </div>

              {/* CONFIRM */}
              <div className="space-y-1">

                <label className="text-[10px] font-semibold text-gray-400 font-mono">

                  CONFIRM PASSWORD

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">

                    <Lock size={15} />

                  </div>

                  <input

                    type="password"

                    required

                    value={confirmPassword}

                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }

                    placeholder="••••••••"

                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-brand-dark/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
                  />

                </div>

              </div>

              {/* BUTTON */}
              <button

                type="submit"

                disabled={loading}

                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-sm mt-6"
              >

                {loading ? (

                  <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>

                ) : (

                  <>
                    <span>
                      Create Account
                    </span>

                    <ArrowRight size={16} />
                  </>
                )}

              </button>

            </form>

          </div>

          {/* LOGIN */}
          <p className="text-center text-xs text-gray-500">

            Already have an account?

            <Link
              to="/login"
              className="font-semibold text-brand-secondary hover:underline ml-1"
            >

              Login

            </Link>

          </p>

        </motion.div>

      </div>

    </MotionWrapper>
  );
};

export default Register;