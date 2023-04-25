import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Image, Input, Modal, Table, Tag} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import TableChildrenChoose from "@app/module/manager_book/Components/TableChildrenChoose";
import {useMutation, useQuery} from "react-query";
import {aproveStudent, getAllProduct, rejectStudent} from "@app/api/ApiProduct";
import * as Notification from "@app/components/Notification";

interface DataType {
  stt: number;
  key: string;
  title: string;
  imageUrl: string;
  form: string;
  location: string;
  description: string;
  userName: string;
  price: string;
  status: string;
}

const {TextArea} = Input;

export function ManagerBook(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagePost =
    "https://cdn.dribbble.com/users/1013019/screenshots/3281397/media/9de100ad01c34ec34d35e843d33504f9.jpg?compress=1&resize=400x300";

  const [value, setValue] = useState("");
  const [id, setId] = useState();

  console.log("sdasdasd", value);
  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };
  const handleOpen = (id?: number) => {
    setId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setValue("");
  };

  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
  };

  // action reject - post
  const rejectStudentPost = useMutation(rejectStudent);
  const approveStudent = useMutation(aproveStudent);

  // get API
  const getAllProductdata = (): Promise<any> => getAllProduct();
  const dataListCertificateMk = useQuery("getAllProduct", getAllProductdata);

  useEffect(() => {
    dataListCertificateMk.refetch();
  }, []);

  const handleApprove = (id: number) => {
    approveStudent.mutate(
      {
        id: id,
      },
      {
        onSuccess: () => {
          Notification.Success("thành công!", "", 2);
          dataListCertificateMk.refetch();
          setValue("");
        },
        onError: () => {
          Notification.Error("Thất bại");
          setValue("");
        },
      }
    );
  };
  const handleSubmit = (data: any) => {
    rejectStudentPost.mutate(
      {
        id: id,
        reasonReject: value,
      },
      {
        onSuccess: () => {
          Notification.Success("Từ chối thành công!", "", 2);
          dataListCertificateMk.refetch();
          setIsModalOpen(false);
        },
        onError: () => {
          Notification.Error("Từ chối Thất bại");
        },
      }
    );
  };
  // const handleReject = (id: number) => {
  //   rejectStudentPost.mutate(
  //     {
  //       id: id,
  //       reasonReject: "ssss",
  //     },
  //     {
  //       onSuccess: () => {
  //         Notification.Success("Xóa thành công!", "", 2);
  //         dataListCertificateMk.refetch();
  //       },
  //       onError: () => {
  //         Notification.Error("Xóa Thất bại");
  //       },
  //     }
  //   );
  // };

  console.log("dataListCertificateMk", dataListCertificateMk.data);
  console.log();
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
        <div>{dataListCertificateMk.data.data.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Tiêu đề bài đăng",
      dataIndex: "title",
      key: "title",
      width: 120,
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (_, dataIndex) => (
        <div>
          <Image
            width={100}
            height={100}
            preview={false}
            src={dataIndex.imageUrl ?? imagePost}
          />
        </div>
      ),
      align: "center",
      width: 200,
    },
    {
      title: "Tình trạng",
      dataIndex: "form",
      key: "form",
      width: 120,
      align: "center",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      width: 120,
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 120,
      align: "center",
    },

    {
      title: "Tên người bán",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width: 100,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 100,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (_, dataIndex) => (
        <div>
          {dataIndex.status === "active" && (
            <Tag color="success">{dataIndex.status}</Tag>
          )}
          {dataIndex.status === "reject" && (
            <Tag color="error">{dataIndex.status}</Tag>
          )}
          {dataIndex.status === "deactive" && (
            <Tag color="warning">{dataIndex.status}</Tag>
          )}
          {dataIndex.status === "pending" && (
            <Tag color="processing">{dataIndex.status}</Tag>
          )}
        </div>
      ),
      width: 120,
      fixed: "right",
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_, record: any) => (
        <div style={{display: "flex", justifyContent: "center"}}>
          {/* <div onClick={() => handleReject(record?.id)}> */}
          <div onClick={() => handleOpen(record?.id)}>
            {dataListCertificateMk.isLoading ? (
              <LoadingOutlined />
            ) : (
              <CloseCircleOutlined
                disabled={
                  record.status !== "active" || record.status !== "reject"
                }
                color="red"
                size={20}
                style={{fontSize: 22, color: "red"}}
              />
            )}
          </div>
          <div style={{width: 5}} />
          <div onClick={() => handleApprove(record?.id)}>
            {dataListCertificateMk.isLoading ? (
              <LoadingOutlined />
            ) : (
              <CheckCircleOutlined
                disabled={
                  record.status !== "active" || record.status !== "reject"
                }
                color="red"
                size={20}
                style={{fontSize: 22, color: "#ADDE63"}}
              />
            )}
          </div>
          {/* )} */}
        </div>
      ),
      fixed: "right",
      width: 100,
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
        scroll={{x: 800, y: 400}}
        expandable={{
          // eslint-disable-next-line react/no-unstable-nested-components
          expandedRowRender: (record: any, index: number) => (
            <div>
              {/* {record.numberIntern !== 0 && ( */}
              <TableChildrenChoose data={record.bookList} key={index} />
              {/* )} */}
            </div>
          ),
          rowExpandable: (record) => record.numberIntern !== 0,
          defaultExpandedRowKeys: ["0"],
        }}
        columns={columns}
        bordered
        dataSource={dataListCertificateMk?.data?.data ?? []}
        loading={dataListCertificateMk.isLoading}
      />
      <Modal
        title="Lí do không chấp nhận"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        // footer={false}
      >
        <div>
          <span style={{width: "20%"}}>Lí do không chấp nhận</span>
          <TextArea
            rows={4}
            placeholder="Nhập lí do"
            value={value}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
      </Modal>
    </div>
  );
}
