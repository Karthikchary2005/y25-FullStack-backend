import React from 'react';

import {
  BrowserRouter
} from 'react-router-dom';

import {
  AuthProvider
} from './context/AuthContext';

import {
  IssueProvider
} from './context/IssueContext';

import AppRoutes from './routes/AppRoutes';


function App() {

  return (

    <BrowserRouter>

      <AuthProvider>

        <IssueProvider>

          <div className="min-h-screen bg-brand-bg text-white overflow-hidden">

            <AppRoutes />

          </div>

        </IssueProvider>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;