import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Image, Modal, Table, Tag} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {InputGlobal} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {Formik} from "formik";
import UploadFileGlobal from "@app/components/UploadFileGlobal";
import {useMutation, useQuery} from "react-query";
import ApiUser from "@app/api/ApiUser";
import * as Notification from "@app/components/Notification";

interface DataType {
  key: string;
  name: string;
  avatar: string;
  address: string;
  description: string;
  transport: string;
  phoneNumber: string;
  total: string;
}

export function ManagerUser(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log("data", data);
  };
  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
  };
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const banUser = useMutation(ApiUser.banUser);

  const handleApprove = (id: number): void => {};
  const handleBanUser = (email: string): void => {
    banUser.mutate(
      {
        email: email,
      },
      {
        onSuccess: () => {
          Notification.Success("Block thành công!", "", 2);
          dataListAllUser.refetch();
        },
        onError: () => {
          Notification.Error("Block Thất bại");
        },
      }
    );
  };
  const listSearchText = [
    {
      placeHolder: "Tìm kiếm...",
      onSearch: handleSearch,
      maxLength: 255,
      tooltip: "Từ khóa: Tiêu đề",
    },
  ];
  const listDatePicker = [
    {
      onChange: (startTime: number, endTime: number): void => {
        console.log("sss");
      },
      tooltip: "Ngày tạo",
      title: "Ngày tạo",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 50,
      render: (_, dataIndex, index) => (
        <div>{dataListAllUser?.data?.data.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "email",
      key: "name",
      width: 150,
      align: "center",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "image",
      render: (_, dataIndex) => (
        <div>
          <Image
            style={{borderRadius: 100, objectFit: "cover"}}
            width={100}
            height={100}
            preview={false}
            src={dataIndex.userImage}
          />
        </div>
      ),
      align: "center",
      width: 100,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      align: "center",
      // render: (_, dataIndex) => <div>Phân loại: {dataIndex.email}</div>,
      width: 100,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: 80,
    },
    {
      title: "Trạng thái",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      fixed: "right",
      align: "center",
      render: (_, dataIndex) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tag color={dataIndex?.userStatus === "active" ? "success" : "error"}>
            {dataIndex?.userStatus}
          </Tag>
        </div>
      ),
      width: 80,
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      fixed: "right",
      align: "center",
      render: (_, dataIndex) => (
        <div style={{display: "flex", justifyContent: "center"}}>
          <div onClick={() => handleBanUser(dataIndex?.email)}>
            <CloseCircleOutlined
              disabled={
                dataIndex.status !== "active" || dataIndex.status !== "reject"
              }
              color="red"
              size={20}
              style={{fontSize: 22, color: "red"}}
            />
          </div>
          <div style={{width: 5}} />
          <div onClick={() => handleApprove(dataIndex?.id)}>
            <CheckCircleOutlined
              disabled={
                dataIndex.status !== "active" || dataIndex.status !== "reject"
              }
              color="red"
              size={20}
              style={{fontSize: 22, color: "#ADDE63"}}
            />
          </div>
          {/* )} */}
        </div>
      ),
      fixed: "right",
      width: 50,
    },
  ];
  const listInputUser = [
    {
      title: "Tên người dùng",
      placeHolder: "Nhập tên người dùng",
      type: "input",
    },
    {
      title: "Ảnh đại diện",
      placeHolder: "Nhập tên người dùng",
      type: "uploadFile",
    },
    {
      title: "Email",
      placeHolder: "Nhập Email",
      type: "input",
    },
    {
      title: "Sách còn lại",
      placeHolder: "Nhập số sách còn lại",
      type: "input",
    },
    {
      title: "Số đơn giao dịch",
      placeHolder: "Nhập số đơn",
      type: "input",
    },
  ];

  const getAllUser = (): Promise<any> => ApiUser.getAllUser();
  const dataListAllUser = useQuery("getAllUser", getAllUser);

  useEffect(() => {
    dataListAllUser.refetch();
  }, []);

  console.log("dataListAllUser", dataListAllUser?.data?.data);

  return (
    <div className="manager-user-container">
      <FilterGroupGlobal
        listSearchText={listSearchText}
        listDatePicker={listDatePicker}
      />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 1000, y: 400}}
        columns={columns}
        dataSource={dataListAllUser?.data?.data ?? []}
      />
      <Modal
        title="Sửa thông tin người dùng"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={{}}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
          // validationSchema={LoginValidation}
        >
          {({handleSubmit}): JSX.Element => {
            return (
              <div>
                {listInputUser.map((item, index) => (
                  <div key={index}>
                    {item.type === "input" && (
                      <div
                        style={{
                          marginBottom: 12,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{width: "20%"}}>{`${item.title}:  `}</span>
                        <InputGlobal
                          name="username"
                          placeholder={item.placeHolder}
                          style={{width: "80%"}}
                          onPressEnter={(): void => handleSubmit()}
                        />
                        <ErrorMessageGlobal name="username" />
                      </div>
                    )}
                    {item.type === "uploadFile" && (
                      <div
                        style={{
                          marginBottom: 12,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{width: "20%"}}>{`${item.title}:  `}</span>
                        <div style={{width: "80%"}}>
                          <UploadFileGlobal
                            handleChange={() => console.log("uploadFile")}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
}
