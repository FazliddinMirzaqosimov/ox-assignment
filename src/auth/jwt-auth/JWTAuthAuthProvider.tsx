import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import jwtAxios, { setToken } from "./jwtaxios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const JWTAuthActionsContext = createContext<JWTAuthActionType>({
  signInUser: (a: signInTypes) => {},
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

  username: string;
  password?: string;
};

export type JWTAuthDataType = {
  user: JwtUserType;
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
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

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
        .get("/admins/" + id)
        .then(
          ({
            data: {
              data: { admin },
            },
          }: {
            data: { data: { admin: JwtUserType } };
          }) => {
            // navigator("/");
            return setJWTAuthData({
              user: admin,
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

  const signInUser = async ({ name, password }: signInTypes) => {
    setJWTAuthData({
      ...JWTAuthData,
      isLoading: true,
    });
    try {
      const { data } = await jwtAxios.post(
        "/admins/login",
        {
          username: name,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setToken(data.data.token, data.data.admin._id);

      setJWTAuthData({
        user: data.data.admin,
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
