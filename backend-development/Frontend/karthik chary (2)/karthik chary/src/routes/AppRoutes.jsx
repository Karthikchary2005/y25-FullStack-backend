import React, {
  useEffect
} from 'react';

import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  AnimatePresence
} from 'framer-motion';

import {
  useAuth
} from '../context/AuthContext';

// PAGES
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CreateIssue from '../pages/CreateIssue';
import IssueList from '../pages/IssueList';
import IssueDetails from '../pages/IssueDetails';
import AdminPanel from '../pages/AdminPanel';
import NotFound from '../pages/NotFound';

// COMPONENTS
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingOrbs from '../components/FloatingOrbs';

import carBg from '../assets/car-bg.jpg';


// PROTECTED ROUTE
const ProtectedRoute = ({
  children
}) => {

  const {
    user,
    loading
  } = useAuth();

  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white">

        Loading...

      </div>
    );
  }

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};


// ADMIN ROUTE
const AdminRoute = ({
  children
}) => {

  const {
    user
  } = useAuth();

  if (

    !user ||

    user.role !== 'ADMIN'

  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};


// DASHBOARD LAYOUT
const DashboardLayout = ({
  children
}) => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  // SEARCH SHORTCUT
  const triggerSearchFocus = () => {

    if (

      location.pathname !== '/issues'

    ) {

      navigate('/issues');

    } else {

      const input =
        document.querySelector(
          'input'
        );

      if(input){

        input.focus();
      }
    }
  };

  // CTRL + K
  useEffect(() => {

    const handleKeyDown = (e) => {

      if (

        (e.ctrlKey || e.metaKey) &&

        e.key.toLowerCase() === 'k'

      ) {

        e.preventDefault();

        triggerSearchFocus();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };

  }, [location.pathname]);

  return (

    <div className="flex min-h-screen text-gray-200 overflow-hidden bg-[#02040b] relative">

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-fixed pointer-events-none"
        style={{
          backgroundImage: `url(${carBg})`,
          filter: 'blur(4px) brightness(0.22)'
        }}
      />

      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(2,5,15,0.4)_0%,rgba(2,4,11,0.96)_100%)] pointer-events-none"></div>

      <AnimatedBackground />

      <FloatingOrbs />

      {/* SIDEBAR */}
      <div className="z-10 relative flex-shrink-0">

        <Sidebar />

      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-y-auto z-10 relative">

        <Navbar
          onSearchFocus={
            triggerSearchFocus
          }
        />

        <main className="flex-grow p-4">

          <AnimatePresence mode="wait">

            {children}

          </AnimatePresence>

        </main>

      </div>

    </div>
  );
};


// MAIN ROUTES
const AppRoutes = () => {

  return (

    <Routes>

      {/* ROOT */}
      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={

          <ProtectedRoute>

            <DashboardLayout>

              <Dashboard />

            </DashboardLayout>

          </ProtectedRoute>
        }
      />

      {/* CREATE ISSUE */}
      <Route
        path="/create-issue"
        element={

          <ProtectedRoute>

            <DashboardLayout>

              <CreateIssue />

            </DashboardLayout>

          </ProtectedRoute>
        }
      />

      {/* ISSUE LIST */}
      <Route
        path="/issues"
        element={

          <ProtectedRoute>

            <DashboardLayout>

              <IssueList />

            </DashboardLayout>

          </ProtectedRoute>
        }
      />

      {/* ISSUE DETAILS */}
      <Route
        path="/issues/:id"
        element={

          <ProtectedRoute>

            <DashboardLayout>

              <IssueDetails />

            </DashboardLayout>

          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={

          <ProtectedRoute>

            <DashboardLayout>

              <AdminRoute>

                <AdminPanel />

              </AdminRoute>

            </DashboardLayout>

          </ProtectedRoute>
        }
      />

      {/* NOT FOUND */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;