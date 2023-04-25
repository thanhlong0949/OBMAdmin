import {Image, Table} from "antd";
import React from "react";
import {ColumnType} from "antd/lib/table";

interface ITableChildren {
  data?: any;
}

export default function TableChildrenChoose(
  props: ITableChildren
): JSX.Element {
  const {data} = props;

  // Reject student

  const columns: ColumnType<any>[] = [
    {
      title: "Tên sách",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 200,
      // render: (_: any, record: any) => <div>{record?.student?.fullName}</div>,
    },
    {
      title: "Ảnh",
      dataIndex: "imageBook",
      key: "imageBook",
      align: "center",
      width: 120,
      render: (_, record, index) => (
        <div>
          <Image
            preview={false}
            style={{objectFit: "cover"}}
            width={70}
            height={70}
            src="img/avatar/avatar.jpg"
            fallback="img/avatar/avatar.jpg"
          />
        </div>
      ),
    },
    {
      title: "Ngày xuất bản",
      dataIndex: "publicationDate",
      key: "publicationDate",
      align: "center",
      width: 150,
      // render: (_: any, record: any) => <div>{record?.student?.email}</div>,
    },
    {
      title: "Công ty xuất bản",
      dataIndex: "publicCompany",
      key: "publicCompany",
      align: "center",
      width: 200,
      // render: (_: any, record: any) => (
      //   <div>{record?.student?.phoneNumber}</div>
      // ),
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      align: "center",
      width: 200,
    },
    {
      title: "Thể loại",
      dataIndex: "coverType",
      key: "coverType",
      align: "center",
      width: 200,
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
      align: "center",
      width: 200,
    },
    {
      title: "Tình trạng",
      dataIndex: "statusQuo",
      key: "statusQuo",
      align: "center",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 200,
    },
  ];

  return (
    <Table
      scroll={{x: 800}}
      columns={columns}
      dataSource={data ?? []}
      pagination={false}
    />
  );
}
