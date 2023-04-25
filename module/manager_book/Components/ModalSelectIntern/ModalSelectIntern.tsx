import "./index.scss";
import React from "react";
import {Switch, Table} from "antd";
import {useWindowDimensions} from "@app/utils/hooks/layout/get-window";
import {Filter} from "@app/components/Filter";

export default function ModalSelectIntern(): JSX.Element {
  const {height} = useWindowDimensions();
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const listSearch: any = [
    {
      isSearch: true,
      visible: true,
      placeholder: "Nhập từ khóa tìm kiếm",
      handleOnChangeSearch: (e: any) => {
        console.log("handleOnChangeSearch");
      },
    },

    {
      isSelect: true,
      multiSelect: true,
      visible: true,
      placeholder: "Chọn công nghệ",
      label: "Công nghệ: ",
      // width: 250,
      data: [
        {
          title: "Nodejs",
          value: 1,
          default: false,
        },
        {
          title: "React Native",
          value: 2,
          default: false,
        },
        {
          title: "Java",
          value: 3,
          default: false,
        },
      ],
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "",
    },
  ];

  const columns: any = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: 200,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "age",
      key: "age",
      width: 200,
      align: "center",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "address",
      key: "address",
      width: 200,
      align: "center",
    },
    {
      title: "Vị trí làm việc",
      dataIndex: "address",
      key: "address",
      width: 200,
      align: "center",
    },
    {
      title: "Thao tác",
      dataIndex: "address",
      key: "address",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_: any, record: any) => (
        <div className="button-add">
          <Switch defaultChecked onChange={onChange} />
        </div>
      ),
    },
  ];
  return (
    <div className="modal-select-intern-container">
      <div className="title">Mentor: Nguyen Van A</div>
      <Filter listSearch={listSearch} />
      <div className="table-modal">
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{x: 800, y: height - 400}}
        />
      </div>
    </div>
  );
}
