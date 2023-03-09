import { authPages } from "./auth";
import { dashboardPages } from "./dashboard";
import { samplePages } from "./sample";

export const unAuthorizedStructure = {
  paths: [...authPages],
};

export const authorizedStructure = {
  paths: [...dashboardPages, ...samplePages],
};
