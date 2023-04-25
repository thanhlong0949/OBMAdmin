import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Image, Modal, Table} from "antd";
import {StopOutlined} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {InputGlobal} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {Formik} from "formik";
import UploadFileGlobal from "@app/components/UploadFileGlobal";
import ApiUser from "@app/api/ApiUser";
import {useQuery} from "react-query";
import {useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";

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

export function ReportBlock(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: IRotoState) => state.user);

  console.log("user", user?.data?.name);
  const getAllReport = (): Promise<any> => ApiUser.getAllReport();
  const dataListAllReport = useQuery("dataListAllReport", getAllReport);

  useEffect(() => {
    dataListAllReport.refetch();
  }, []);

  console.log("dataListAllReport", dataListAllReport?.data?.data);

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
      width: 80,
      render: (_, dataIndex) => (
        <div>{dataListAllReport?.data?.data.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Email khiếu nại",
      key: "emailReported",
      dataIndex: "emailReported",
      align: "center",
      // render: (_, dataIndex) => <div>Phân loại: {dataIndex.description}</div>,
      width: 150,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      align: "center",
      width: 150,
    },
    {
      title: "Lí do khiếu nại",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      width: 150,
    },

    // {
    //   title: "Email bị khiếu nại",
    //   key: "email",
    //   dataIndex: "description",
    //   align: "center",
    //   render: (_, dataIndex) => <div>Phân loại: {dataIndex.description}</div>,
    //   width: 150,
    // },
    // {
    //   title: "Bằng chứng",
    //   dataIndex: "avatar",
    //   key: "image",
    //   render: (_, dataIndex) => (
    //     <div>
    //       <Image
    //         style={{borderRadius: 100}}
    //         width={100}
    //         height={100}
    //         preview={false}
    //         src={dataIndex.avatar}
    //       />
    //     </div>
    //   ),
    //   align: "center",
    //   width: 120,
    // },
    // {
    //   title: "Ngày tạo",
    //   dataIndex: "time_created",
    //   key: "time_created",
    //   align: "center",
    //   width: 100,
    // },
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
    //       <div style={{marginLeft: 8}}>
    //         <StopOutlined style={{fontSize: 22, color: "blue"}} />
    //       </div>
    //     </div>
    //   ),
    //   fixed: "right",
    //   width: 100,
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
    <>
      {user?.data?.name === "admin" ? (
        <div className="manager-user-container">
          <FilterGroupGlobal
            listSearchText={listSearchText}
            listDatePicker={listDatePicker}
          />
          <Table
            style={{marginTop: 10}}
            scroll={{x: 800, y: 400}}
            columns={columns}
            dataSource={dataListAllReport?.data?.data}
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
                            <span
                              style={{width: "20%"}}
                            >{`${item.title}:  `}</span>
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
                            <span
                              style={{width: "20%"}}
                            >{`${item.title}:  `}</span>
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
      ) : (
        <div>Bạn không có quyền xem trang này</div>
      )}
    </>
  );
}
