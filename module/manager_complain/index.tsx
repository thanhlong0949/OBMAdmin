import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Image, Modal, notification, Table, Tooltip} from "antd";
import {DiffOutlined, FormOutlined} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {InputGlobal} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {Formik} from "formik";
import UploadFileGlobal from "@app/components/UploadFileGlobal";
import {getAllProduct} from "@app/api/ApiProduct";
import {useMutation, useQuery} from "react-query";
import ApiUser from "@app/api/ApiUser";
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

export function ManagerComplain(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paramSubmit, setParamSubmit] = useState({
    orderCode: "",
    userReportedId: "",
  });
  const user = useSelector((state: IRootState) => state.user);
  console.log("paramSubmit", paramSubmit);
  const createNewReport = useMutation(ApiUser.createNewReport);

  const showModal = (code: string, id: number) => {
    setParamSubmit({
      orderCode: code ?? "",
      userReportedId: id ?? "",
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log("data", data);
    createNewReport.mutate(
      {
        approvedBy: user?.data?.id,
        orderCode: paramSubmit.orderCode,
        reason: data.reason,
        userReportedId: paramSubmit.userReportedId,
      },
      {
        onSuccess: (res) => {
          setIsModalOpen(false);
          notification.success({
            message: "Tạo báo cáo thành công!",
          });
        },
      }
    );
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
      width: 100,
      render: (_, dataIndex) => (
        <div>{dataGetAllComplain?.data?.data.indexOf(dataIndex) + 1}</div>
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
      title: "Người khiếu nại",
      dataIndex: "userComplained",
      key: "userComplained",
      width: 120,
      align: "center",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 120,
      align: "center",
    },
    {
      title: "Hình ảnh mô tả",
      dataIndex: "avatar",
      key: "image",
      render: (_, dataIndex) => (
        <div>
          <Image
            width={100}
            height={100}
            preview={false}
            src={dataIndex.complaintImage}
          />
        </div>
      ),
      align: "center",
      width: 200,
    },
    {
      title: "Mô tả chi tiết",
      key: "description",
      dataIndex: "description",
      align: "center",
      // render: (_, dataIndex) => <div>Phân loại: {dataIndex.description}</div>,
      width: 120,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      align: "center",
      width: 120,
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user?.data?.name !== "admin" ? (
            <div style={{marginLeft: 8}}>
              <FormOutlined
                onClick={() =>
                  showModal(record.orderCode, record.userComplainedId)
                }
                disabled
                style={{fontSize: 22, color: "blue"}}
              />
            </div>
          ) : (
            <div style={{marginLeft: 8}}>
              <Tooltip placement="topRight" title="không có quyền thao tác">
                <FormOutlined disabled style={{fontSize: 22, color: "gray"}} />
              </Tooltip>
            </div>
          )}
        </div>
      ),
      fixed: "right",
      width: 100,
    },
  ];
  const listInputUser = [
    // {
    //   title: "approvedBy",
    //   placeHolder: "approvedBy",
    //   type: "input",
    //   value: "approvedBy",
    // },
    // {
    //   title: "orderCode",
    //   placeHolder: "orderCode",
    //   type: "input",
    //   value: "orderCode",
    // },
    {
      title: "reason",
      placeHolder: "reason",
      type: "input",
      value: "reason",
    },
    // {
    //   title: "userReportedId",
    //   placeHolder: "userReportedId",
    //   type: "input",
    //   value: "userReportedId",
    // },
  ];

  const getAllComplain = (): Promise<any> => ApiUser.getAllComplain();
  const dataGetAllComplain = useQuery("getAllProduct", getAllComplain);
  useEffect(() => {
    dataGetAllComplain.refetch();
  }, []);

  console.log("dataGetAllComplain", dataGetAllComplain?.data?.data);

  return (
    <div className="manager-user-container">
      <FilterGroupGlobal
        listSearchText={listSearchText}
        listDatePicker={listDatePicker}
      />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 800, y: 400}}
        columns={columns}
        dataSource={dataGetAllComplain?.data?.data}
      />

      <Formik
        initialValues={{
          reason: "",
        }}
        onSubmit={handleSubmit}
        validateOnChange
        validateOnBlur
        // validationSchema={LoginValidation}
      >
        {({handleSubmit}): JSX.Element => {
          return (
            <Modal
              title="Sửa thông tin sản phẩm"
              open={isModalOpen}
              onOk={handleSubmit}
              onCancel={handleCancel}
            >
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
                          name={item.value}
                          placeholder={item.placeHolder}
                          style={{width: "80%"}}
                          onPressEnter={(): void => handleSubmit()}
                          // value={item.value}
                        />
                        <ErrorMessageGlobal name={item.value} />
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
            </Modal>
          );
        }}
      </Formik>
    </div>
  );
}
