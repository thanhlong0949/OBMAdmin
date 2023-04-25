import React, {useEffect, useState} from "react";
import "./index.scss";
import Highcharts from "highcharts";
import patternFill from "highcharts/modules/pattern-fill";
import ApiUser from "@app/api/ApiUser";
import {useQuery} from "react-query";
import {Button, DatePicker, Select} from "antd";
import {Line} from "react-chartjs-2";
import Chart from "chart.js/auto";

export function TransactionStatistics() {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataCColumn, setDataColumn] = useState([]);
  const [dataTmp, setDataTmp] = useState({
    month: "null",
    year: "2023",
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: `Doanh thu trong từng ${
          dataTmp.month === "null" ? "tháng" : "ngày"
        }`,
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });
  const [dataSubmit, setDataSubmit] = useState({month: "null", year: "2023"});
  const listMonth = [
    {
      value: "null",
      label: "Tất cả",
    },
  ];
  const listYear = [];

  for (let i = 0; i < 12; i++) {
    listMonth.push({
      value: i + 1,
      label: `Tháng ${i + 1}`,
    });
  }

  for (let i = 2000; i <= 2023; i++) {
    listYear.push({
      value: i,
      label: `Tháng ${i}`,
    });
  }

  console.log("listMonth", listMonth);

  const handleChange1 = (value: string) => {
    console.log(`1 ${value}`);
    setDataTmp({...dataTmp, month: value});
  };
  const handleChange2 = (value: string) => {
    console.log(`2 ${value}`);
    setDataTmp({...dataTmp, year: value});
  };

  const handleSubmit = (): void => {
    setDataSubmit(dataTmp);
  };

  const getChartTransactionStatistic = (): Promise<any> =>
    ApiUser.chartTransactionStatistic(dataSubmit);
  const getData = useQuery(
    "getChartTransactionStatistic",
    getChartTransactionStatistic
  );

  useEffect(() => {
    // Cấu hình Chart.js
    Chart.defaults.font.family = "sans-serif";
    Chart.defaults.plugins.legend.position = "bottom";
    Chart.defaults.plugins.tooltip.intersect = false;
  }, [dataSubmit]);

  useEffect(() => {
    getData.refetch();

    setDataCategory([]);
    setDataColumn([]);

    const arrayCate = [];
    const arrayData = [];
    getData?.data?.data.forEach((item, index) => {
      if (dataSubmit.month === "null") {
        arrayCate.push(item.month);
      } else {
        arrayCate.push(item.day);
      }

      arrayData.push(item.amount);
    });
    setDataCategory(arrayCate);
    setDataColumn(arrayData);

    setChartData({
      labels: dataCategory,
      datasets: [
        {
          label: `Doanh thu trong từng ${
            dataTmp.month === "null" ? "tháng" : "ngày"
          }`,
          data: dataCColumn,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    });
  }, [dataSubmit]);

  if (typeof Highcharts === "object") {
    patternFill(Highcharts);
  }

  return (
    <div>
      <div style={{marginBottom: 15}}>
        <Select
          defaultValue="null"
          style={{width: 120, marginRight: 10}}
          onChange={handleChange1}
          options={listMonth}
          value={dataTmp.month}
        />
        <Select
          defaultValue="null"
          style={{width: 120, marginRight: 10}}
          onChange={handleChange2}
          options={listYear}
          value={dataTmp.year}
        />
        <Button type="primary" onClick={handleSubmit}>
          Tìm kiếm
        </Button>
      </div>
      <div>
        <Line data={chartData} />
      </div>
    </div>
  );
}
