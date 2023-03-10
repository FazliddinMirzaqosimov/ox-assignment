import { UploadFile } from "antd/lib/upload/interface";
import { JwtUserType } from "auth/jwt-auth/JWTAuthAuthProvider";
import React from "react";

export type appStateType = {
  visible: boolean;
  editItemId: string;
  input: string;
  loading: appLoadingType;
  items: TestType[];
};

export type TestType = {
  question: string;
  variants: AnswerType[];
  topic: string;
  image: string;
  _id: string;
};

export type TopicType = {
  title: string;
  _id: string;
};

export type AnswerType = {
  title: string;
  isAnswer: boolean;
};
export type appActionType = {
  type: string;
  payload: any;
};

export type appLoadingType = { table: boolean; modal: boolean };

export type PostEditPropType = {
  title: string;
  state: appStateType;
  getItems: () => void;
  dispatch: React.Dispatch<appActionType>;
};

export type photoType = { fileList: UploadFile[]; file: UploadFile };
