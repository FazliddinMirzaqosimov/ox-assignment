import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import jwtAxios, { setToken } from "./jwtaxios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

const JWTAuthActionsContext = createContext<JWTAuthActionType>({
  signInUser: (a: signInTypes) => {},
  logout: () => {},
});
const JWTAuthContext = createContext<JWTAuthDataType>({
  isAuthenticated: false,
  isLoading: false,
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

export type JwtUserType = null | {
  username: string;
  password?: string;
};

export type JWTAuthDataType = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

type signInTypes = { name: string; password: string };

export type JWTAuthActionType = {
  signInUser: (a: signInTypes) => void;
  logout: () => void;
};

type PropType = {
  children: React.ReactNode;
};

const JWTAuthAuthProvider = ({ children }: PropType) => {
  const [JWTAuthData, setJWTAuthData] = useState<JWTAuthDataType>({
    isAuthenticated: false,
    isLoading: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setJWTAuthData({
        isAuthenticated: true,
        isLoading: false,
      });
      setToken(token);
      navigator("/");
    }
  }, []);
  const navigator = useNavigate();

  const signInUser = async ({ name, password }: signInTypes) => {
    console.log({ name, password });

    setJWTAuthData({
      ...JWTAuthData,
      isLoading: true,
    });
    try {
      const res = await jwtAxios.post(
        "/security/auth_check",
        `_username=${name}&_password=${password}&_subdomain=toko`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );
      console.log(res.data.token);

      setToken(res.data.token);

      setJWTAuthData({
        isAuthenticated: true,
        isLoading: false,
      });
      navigator("/");
    } catch (error: any) {
      console.log(error);

      message.error(error?.response?.data?.error || error?.message, 2);

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
      isLoading: false,
      isAuthenticated: false,
    });
    navigator("/");
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...JWTAuthData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
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
