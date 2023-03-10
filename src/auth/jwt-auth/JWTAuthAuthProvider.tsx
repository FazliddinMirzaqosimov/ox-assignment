import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import jwtAxios, { setToken } from "./jwtaxios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const JWTAuthActionsContext = createContext<JWTAuthActionType>({
  signInUser: (a: signInTypes) => {},
  signUpUser: (a: signUpTypes) => {},
  logout: () => {},
});
const JWTAuthContext = createContext<JWTAuthDataType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

export type JwtUserType = null | {
  _id: string;
  email: string;
  name: string;
  password?: string;
  photo?: string;
  role: "admin" | "user";
};

export type JWTAuthDataType = {
  user: JwtUserType;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type signInTypes = { email: string; password: string };
type signUpTypes = { email: string; name: string; password: string };

export type JWTAuthActionType = {
  signInUser: (a: signInTypes) => void;
  signUpUser: (a: signUpTypes) => void;
  logout: () => void;
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
  console.log(JWTAuthData.user);

  const navigator = useNavigate();
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
        .get("/users/" + id)
        .then(
          ({
            data: {
              data: { user },
            },
          }: {
            data: { data: { user: JwtUserType } };
          }) => {
            return setJWTAuthData({
              user: user,
              isLoading: false,
              isAuthenticated: true,
            });
          }
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
    setJWTAuthData({
      ...JWTAuthData,
      isLoading: true,
    });
    try {
      const { data } = await jwtAxios.post("/users/signin", {
        email,
        password,
      });

      setToken(data.data.token, data.data.user._id);

      setJWTAuthData({
        user: data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      navigator("/");
    } catch (error: any) {
      message.error(error?.response?.data?.error || error?.message, 2);

      setJWTAuthData({
        ...JWTAuthData,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const signUpUser = async ({ name, email, password }: signUpTypes) => {
    try {
      const { data } = await jwtAxios.post("/users/signup", {
        name,
        email,
        password,
      });

      setToken(data.data.token, data.data.user._id);
      setJWTAuthData({
        user: data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      navigator("/");
    } catch (error: any) {
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
      user: null,
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
