import { UploadFile } from "antd/lib/upload/interface";
import React from "react";

export type appStateType = {
  visible: boolean;
  editItemId: string;
  input: string;
  loading: appLoadingType;
  items: ItemType[];
};

export type ItemType = {
  titleUz: string;
  bodyUz: string;
  titleRu: string;
  bodyRu: string;
  _id: string;
} | null;

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
