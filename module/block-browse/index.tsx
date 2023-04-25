import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Image, Modal, Switch, Table} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {
  CheckboxGlobal,
  InputGlobal,
  InputPasswordGlobal,
} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {ButtonGlobal} from "@app/components/ButtonGlobal";
import {Formik} from "formik";
import {loginUser} from "@app/redux/slices/UserSlice";
import UploadFileGlobal from "@app/components/UploadFileGlobal";
import ApiUser from "@app/api/ApiUser";
import {useQuery} from "react-query";

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

export function BlockBrowse(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllOrder = (): Promise<any> => ApiUser.getAllOrder();
  const dataListAllOrder = useQuery("getAllOrder", getAllOrder);

  useEffect(() => {
    dataListAllOrder.refetch();
  }, []);

  console.log("dataListAllOrder", dataListAllOrder?.data?.data);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log("data", data);
  };
  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
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
      render: (_, dataIndex) => (
        <div>{dataListAllOrder?.data?.data.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      width: 120,
      align: "center",
    },
    {
      title: "Ảnh bài đăng",
      dataIndex: "postImage",
      key: "postImage",
      render: (_, dataIndex) => (
        <div>
          <Image
            style={{borderRadius: 100}}
            width={100}
            height={100}
            preview={false}
            src={dataIndex.postImage}
          />
        </div>
      ),
      align: "center",
      width: 100,
    },
    {
      title: "Địa chỉ giao hàng",
      key: "shipAddress",
      dataIndex: "shipAddress",
      align: "center",
      // render: (_, dataIndex) => <div>Phân loại: {dataIndex.description}</div>,
      width: 100,
    },
    {
      title: "Phương thức thanh toán",
      key: "paymentMethod",
      dataIndex: "paymentMethod",
      align: "center",
      // render: (_, dataIndex) => <div>Phân loại: {dataIndex.description}</div>,
      width: 150,
    },
    {
      title: "Phương thức giao hàng",
      key: "deliveryMethod",
      dataIndex: "deliveryMethod",
      align: "center",
      // render: (_, dataIndex) => <div>Phân loại: {dataIndex.description}</div>,
      width: 150,
    },
    {
      title: "Chú thích",
      dataIndex: "note",
      key: "note",
      align: "center",
      width: 80,
    },
    {
      title: "Loại giao dịch",
      dataIndex: "form",
      key: "form",
      align: "center",
      width: 80,
    },
    {
      title: "Ngày tạo",
      dataIndex: "orderDate",
      key: "orderDate",
      align: "center",
      width: 80,
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      align: "center",
      fixed: "right",
      width: 120,
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      align: "center",
      fixed: "right",
      width: 120,
    },
    // {
    //   title: "Thao tác",
    //   key: "action",
    //   dataIndex: "action",
    //   align: "center",
    //   render: () => (
    //     <div
    //       onClick={showModal}
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <div style={{marginLeft: 8, display: "flex"}}>
    //         <CloseCircleOutlined
    //           style={{fontSize: 22, color: "red", marginRight: 5}}
    //         />
    //         <CheckCircleOutlined style={{fontSize: 22, color: "blue"}} />
    //       </div>
    //     </div>
    //   ),
    //   fixed: "right",
    //   width: 50,
    // },
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

  return (
    <div className="manager-user-container">
      <FilterGroupGlobal
        listSearchText={listSearchText}
        listDatePicker={listDatePicker}
      />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 1600, y: 400}}
        columns={columns}
        dataSource={dataListAllOrder?.data?.data}
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
