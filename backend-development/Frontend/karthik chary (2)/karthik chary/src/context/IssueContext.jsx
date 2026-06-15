import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import axios from 'axios';

import { useAuth } from './AuthContext';

const IssueContext =
  createContext(null);

export const IssueProvider = ({
  children
}) => {

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

  const authHeaders = () => {

    const token =
      localStorage.getItem(
        "token"
      );

    return token
      ? {
          Token: token
        }
      : {};
  };

  // LOAD ISSUES
  useEffect(() => {

    if(user){

      loadIssues();
    }

  }, [user]);

  // LOAD USER OR ADMIN ISSUES
  const loadIssues = async () => {

    try {

      setLoading(true);

      let response;

      // ADMIN AND TESTER GET ALL ISSUES
      if(canViewAllIssues()) {

        response =
          await axios.get(

            "http://127.0.0.1:8000/authservice/issues"
          );

      } else {

        // USER GETS OWN ISSUES
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

  // CREATE ISSUE
  const createIssue = async (

    title,

    description,

    category,

    priority

  ) => {

    try {

      const response =
        await axios.post(

          "http://127.0.0.1:8000/authservice/createissue",

          {
            title,
            description,
            category,
            priority,

            createdBy: user.id
          },

          {
            headers: authHeaders()
          }
        );

      console.log(response.data);

      await loadIssues();

      return response.data;

    } catch(error) {

      console.log(error);
    }
  };

  // UPDATE ISSUE
  const updateIssue = async (

    issueId,

    data

  ) => {

    try {

      const response =
        await axios.put(

          `http://127.0.0.1:8000/authservice/updateissue/${issueId}`,

          data,

          {
            headers: authHeaders()
          }
        );

      console.log(response.data);

      await loadIssues();

      return response.data;

    } catch(error) {

      console.log(error);

      return {
        code: 500,
        message: "Issue update failed"
      };
    }
  };

  // UPDATE STATUS
  const updateIssueStatus = async (

    issueId,

    status

  ) => {

    try {

      const response =
        await axios.put(

          `http://127.0.0.1:8000/authservice/updatestatus/${issueId}`,

          {
            status
          },

          {
            headers: authHeaders()
          }
        );

      console.log(response.data);

      await loadIssues();

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

        `http://127.0.0.1:8000/authservice/deleteissue/${issueId}`,

        {
          headers: authHeaders()
        }
      );

      await loadIssues();

    } catch(error) {

      console.log(error);
    }
  };

  return (

    <IssueContext.Provider
      value={{

        issues,

        loading,

        loadIssues,

        createIssue,

        updateIssue,

        updateIssueStatus,

        deleteIssue
      }}
    >

      {children}

    </IssueContext.Provider>
  );
};

export const useIssues = () => {

  return useContext(
    IssueContext
  );
};
