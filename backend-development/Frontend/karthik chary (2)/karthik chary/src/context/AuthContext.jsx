import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import axios from 'axios';

const AuthContext =
  createContext(null);

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // LOAD USER
  useEffect(() => {

    const initializeAuth =
      async () => {

        try {

          const storedUser =
            localStorage.getItem(
              "user"
            );

          const token =
            localStorage.getItem(
              "token"
            );

          if (
            storedUser &&
            token
          ) {

            const parsedUser =
              JSON.parse(
                storedUser
              );

            setUser(
              parsedUser
            );
          }

        } catch(error) {

          console.log(error);

          localStorage.removeItem(
            "user"
          );

          localStorage.removeItem(
            "token"
          );
        }

        setLoading(false);
      };

    initializeAuth();

  }, []);

  // LOGIN
  const login = async (
    email,
    password
  ) => {

    try {

      const response =
        await axios.post(

          "http://127.0.0.1:8000/authservice/signin",

          {
            email,
            password
          }
        );

      console.log(
        response.data
      );

      if (
        response.data.code === 200
      ) {

        const token =
          response.data.jwt;

        const loggedUser =
          response.data.user;

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          token
        );

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(
            loggedUser
          )
        );

        // UPDATE STATE
        setUser(
          loggedUser
        );

        return {

          success: true,

          user: loggedUser
        };

      } else {

        return {

          success: false,

          message:
            response.data.message
        };
      }

    } catch(error) {

      console.log(error);

      return {

        success: false,

        message:
          "Login Failed"
      };
    }
  };

  // REGISTER
  const register = async (
    name,
    email,
    password
  ) => {

    try {

      const response =
        await axios.post(

          "http://127.0.0.1:8000/authservice/signup",

          {
            name,
            email,
            password
          }
        );

      return response.data;

    } catch(error) {

      console.log(error);

      return {

        code: 500,

        message:
          "Registration Failed"
      };
    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    window.location.href =
      "/login";
  };

  // CHECK ADMIN
  const isAdmin = () => {

    return (
      user?.role === "ADMIN"
    );
  };

  return (

    <AuthContext.Provider
      value={{

        user,

        loading,

        login,

        register,

        logout,

        isAdmin
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  return useContext(
    AuthContext
  );
};