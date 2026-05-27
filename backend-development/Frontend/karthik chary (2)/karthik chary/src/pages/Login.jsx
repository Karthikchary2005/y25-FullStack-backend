import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  Mail,
  Lock,
  ArrowRight,
  Bug,
  AlertCircle,
  Terminal
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

import MotionWrapper from '../components/MotionWrapper';

import { TiltWrapper } from '../components/TiltWrapper';

import { TechCube3D } from '../components/TechCube3D';

import heroBg from '../assets/hero.png';

export const Login = () => {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const { login } =
    useAuth();

  const navigate =
    useNavigate();

  // LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      setError(
        "Please fill all fields."
      );

      return;
    }

    try {

      setError('');

      setLoading(true);

      const result =
        await login(
          email,
          password
        );

      if(result.success){

        alert(
          "Login Successful"
        );

        navigate('/dashboard');

      } else {

        setError(
          result.message
        );
      }

    } catch (err) {

      console.log(err);

      setError(
        "Backend Connection Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <MotionWrapper className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#02050f] text-gray-200 relative overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: 'blur(3.5px) brightness(0.32) saturate(1.3)'
        }}
      />

      {/* OVERLAYS */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-brand-secondary/15 via-transparent to-brand-primary/10 pointer-events-none"></div>

      <div className="absolute top-[30%] left-[20%] w-[450px] h-[450px] bg-brand-secondary/12 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="absolute bottom-[20%] right-[30%] w-[550px] h-[550px] bg-brand-primary/6 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(2,5,15,0.4)_0%,rgba(3,2,8,0.92)_100%)] pointer-events-none"></div>

      {/* LEFT SIDE */}
      <div className="flex items-center justify-center p-8 relative overflow-hidden z-10">

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

          className="w-full max-w-md space-y-8 z-10"
        >

          {/* HEADER */}
          <div className="text-center lg:text-left space-y-3">

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

                Welcome back

              </h2>

              <p className="text-sm text-gray-400">

                Streamline your debugging workflow.

              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="glass-panel rounded-2xl p-6 shadow-glass space-y-6">

            {error && (

              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 flex items-center gap-2">

                <AlertCircle size={14} />

                <span>{error}</span>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* EMAIL */}
              <div className="space-y-1.5">

                <label className="text-xs font-semibold text-gray-400 font-mono">

                  EMAIL ADDRESS

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">

                    <Mail size={16} />

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

                    placeholder="name@company.com"

                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-brand-dark/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-secondary/40 focus:ring-1 focus:ring-brand-secondary/40 transition-all text-sm"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="space-y-1.5">

                <label className="text-xs font-semibold text-gray-400 font-mono">

                  PASSWORD

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">

                    <Lock size={16} />

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

                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-brand-dark/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-secondary/40 focus:ring-1 focus:ring-brand-secondary/40 transition-all text-sm"
                  />

                </div>

              </div>

              {/* BUTTON */}
              <button

                type="submit"

                disabled={loading}

                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-sm hover:opacity-95 transition-all shadow-glow-cyan"
              >

                {loading ? (

                  <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>

                ) : (

                  <>
                    <span>Initialize Session</span>
                    <ArrowRight size={16} />
                  </>
                )}

              </button>

            </form>

          </div>

          {/* REGISTER */}
          <p className="text-center text-xs text-gray-500">

            No account yet?

            {' '}

            <Link
              to="/register"
              className="font-semibold text-brand-secondary hover:underline"
            >

              Register

            </Link>

          </p>

        </motion.div>

      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-brand-dark/30 to-[#030208]/40 backdrop-blur-md border-l border-white/5 relative overflow-hidden select-none z-10">

        <div className="absolute inset-0 cyber-grid-overlay opacity-20"></div>

        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-brand-secondary/10 rounded-full blur-[100px]"></div>

        {/* TOP */}
        <div className="flex justify-between items-center z-10 text-xs text-gray-500 font-mono">

          <span className="flex items-center gap-1.5 text-brand-secondary">

            <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-ping"></span>

            SYSTEM ACTIVE

          </span>

          <span>

            LATENCY: 12ms

          </span>

        </div>

        {/* CUBE */}
        <motion.div

          animate={{
            y: [0, -12, 0]
          }}

          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}

          className="flex justify-center my-6 z-10"
        >

          <div className="relative scale-110">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-6 bg-brand-secondary/15 rounded-full blur-[15px]"></div>

            <TechCube3D />

          </div>

        </motion.div>

        {/* TERMINAL */}
        <TiltWrapper maxTilt={15} className="z-10 w-full max-w-xl mx-auto">

          <div className="glass-panel-glow rounded-xl p-5 border border-cyan-500/20 shadow-glass-lg relative flex flex-col font-mono text-xs">

            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3 text-[10px] text-gray-500 font-bold uppercase tracking-wider">

              <span className="flex items-center gap-1.5 text-white">

                <Terminal size={12} className="text-brand-secondary" />

                SYSTEM DIAGNOSTICS

              </span>

              <span>

                v2.4.9-core

              </span>

            </div>

            <div className="space-y-1.5 text-[11px] leading-relaxed text-gray-400">

              <p className="text-brand-secondary">

                &gt; resolve-ai init

              </p>

              <p className="text-emerald-400">

                ✓ PostgreSQL Connected

              </p>

              <p className="text-emerald-400">

                ✓ JWT Authentication Ready

              </p>

              <p className="text-cyan-400 animate-pulse">

                ● Backend Listening Active

              </p>

            </div>

          </div>

        </TiltWrapper>

        {/* BOTTOM */}
        <div className="z-10 max-w-md">

          <span className="text-[10px] uppercase font-mono tracking-widest text-brand-secondary font-bold">

            WORKFLOW REDEFINED

          </span>

          <h3 className="text-2xl font-bold font-display text-white mt-1 leading-tight">

            Resolve issues faster with intelligent tracking.

          </h3>

          <p className="text-xs text-gray-400 mt-2">

            Real-time issue monitoring,
            smart workflows,
            and production-grade tracking.

          </p>

        </div>

      </div>

    </MotionWrapper>
  );
};

export default Login;