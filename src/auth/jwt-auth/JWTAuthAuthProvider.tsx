import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import jwtAxios, { setToken } from "./jwtaxios";

const JWTAuthActionsContext = createContext<JWTAuthActionType>(null);
const JWTAuthContext = createContext<JWTAuthDataType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

export type JwtUserType = null | {
  email: string;
  name: string;
  photo?: string;
};

export type JWTAuthDataType = {
  user: JwtUserType;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type signInTypes = { email: string; password: string };
type signUpTypes = { email: string; name: string; password: string };

export type JWTAuthActionType = null | {
  signInUser: (a: signInTypes) => void;
  signUpUser: (a: signUpTypes) => void;
  logout: () => Promise<void>;
};

type PropType = {
  children: React.ReactNode;
};

const JWTAuthAuthProvider = ({ children }: PropType) => {
  const [JWTAuthData, setJWTAuthData] = useState<JWTAuthDataType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem("token"),
        id = localStorage.getItem("id");

      if (!token) {
        setJWTAuthData({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setToken(token);
      jwtAxios
        .get("/api/v1/users/" + id)
        .then(({ data }: { data: JwtUserType }) =>
          setJWTAuthData({
            user: data,
            isLoading: false,
            isAuthenticated: true,
          })
        )
        .catch(() =>
          setJWTAuthData({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          })
        );
    };

    getAuthUser();
  }, []);

  const signInUser = async ({ email, password }: signInTypes) => {
    try {
      const { data } = await jwtAxios.post("auth", { email, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      const res = await jwtAxios.get("/auth");
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthData,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const signUpUser = async ({ name, email, password }: signUpTypes) => {
    try {
      const { data } = await jwtAxios.post("users", { name, email, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      const res = await jwtAxios.get("/auth");
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setJWTAuthData({
        ...JWTAuthData,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...JWTAuthData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
