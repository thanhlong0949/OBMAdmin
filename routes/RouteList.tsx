import {ReactNode} from "react";
import {Icon} from "@app/components/Icon";

export interface IRoute {
  path: string;
  name: string;
  isSidebar: boolean;
  isLanding?: boolean;
  icon?: ReactNode;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: "/login",
    name: "Đăng nhập",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/manager_user",
    name: "Quản lý người dùng",
    isSidebar: true,
  },
  {
    path: "/manager_book",
    name: "Quản lý sản phẩm",
    isSidebar: true,
  },
  {
    path: "/manager_complain",
    name: "Quản lý khiêu nại",
    isSidebar: true,
  },
  {
    path: "/transaction_statistics",
    name: "Thống kê giao dịch",
    isSidebar: true,
  },
  {
    path: "/report-block",
    name: "Báo cáo vi phạm",
    isSidebar: true,
  },
  {
    path: "/block-browse",
    name: "Danh sách đơn hàng",
    isSidebar: true,
  },
];

export default routes;
