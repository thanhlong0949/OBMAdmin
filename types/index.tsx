import React from "react";

export interface CommonReduxAction {
  type: string;
}

export interface CommonReactProps {
  children: React.ReactNode;
}

export interface IAccountInfo {
  id?: number;
  accesstoken?: string;
  expires_in?: number;
  role?: any;
  firstname?: string;
  email?: string;
  url_image?: string;
  pass_jwt?: string;
}
