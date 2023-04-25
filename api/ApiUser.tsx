import {fetcher} from "./Fetcher";
import store from "../redux/store";

export interface ILoginBody {
  email: string;
  password: string;
  // has_role: boolean;
}
export interface ILoginResponse {
  response: {
    accesstoken: string;
    expires_in: number;
    pass_jwt: string;
  };
  role: any;
}

export interface IParamsGetUser {
  sort?: string[];
  searchFields?: string[];
  pageSize?: number;
  pageNumber?: number;
  disablePagination?: boolean;
  search?: string;
  searchType?: string;
}

export interface IGetUserResponse {
  response?: {
    data?: {
      id?: number;
      firstname?: string;
      email?: string;
      url_image?: string;
    };
  };
}

const path = {
  getUser: "/auth/get-user",
  login: "/auth/login",
  getAllUser: "auth/get-all-user",
  banUser: "auth/ban-user",
  getAllComplain: "/complaint/get-all-complaint",
};

function login(body: ILoginBody): Promise<ILoginResponse> {
  return fetcher(
    {url: path.login, method: "post", data: body},
    {displayError: true}
  );
}

function banUser(params: {email: string}): Promise<ILoginResponse> {
  return fetcher(
    {url: path.banUser, method: "put", params: params},
    {displayError: true}
  );
}

function getUser(): Promise<IGetUserResponse> {
  return fetcher({url: path.getUser, method: "get"});
}

function getAllUser(): Promise<IGetUserResponse> {
  return fetcher({url: path.getAllUser, method: "get"});
}

function getAllOrder(): Promise<IGetUserResponse> {
  return fetcher({url: "/order/get-all-order", method: "get"});
}

function getAllReport(): Promise<IGetUserResponse> {
  return fetcher({url: "/report/get-all-report", method: "get"});
}

function createNewReport(body: {
  approvedBy: number;
  orderCode: string;
  reason: string;
  userReportedId: number;
}): Promise<ILoginResponse> {
  return fetcher(
    {url: "/report/createNewReport", method: "post", data: body},
    {displayError: true}
  );
}

function isLogin(): boolean {
  const {user} = store.getState();
  return !!user?.accesstoken;
}

function getAllComplain(): Promise<any> {
  return fetcher({
    url: path.getAllComplain,
    method: "get",
    // params: params,
  });
}

function chartTransactionStatistic(params: {
  month: string;
  year: string;
}): Promise<any> {
  return fetcher({
    url: "/order/get-revenue",
    method: "get",
    params: params,
  });
}

export default {
  login,
  isLogin,
  getUser,
  getAllUser,
  banUser,
  getAllComplain,
  chartTransactionStatistic,
  getAllOrder,
  getAllReport,
  createNewReport,
};
