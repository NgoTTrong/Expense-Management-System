import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";
import useUser from "../../stores/user-store";
import { Pie } from "@ant-design/charts";
import ExpenseService from "../../services/expense-service";
import useExpenses from "../../stores/expensive-store";
import LoadingModal from "../../components/loading/loading-modal";
import ICategory from "../../interfaces/category-interface";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { formatNumberWithCommas } from "../../utils/functions";
import Empty from "../../components/commons/empty";
interface DataType {
  index: number;
  key: number;
  name: string;
  totalSpending: number;
  percent: number;
}
const columns: ColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Pay for",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Total spending",
    dataIndex: "totalSpending",
    key: "totalSpending",
    render: (_, { totalSpending }) => (
      <span className="whitespace-nowrap">
        {formatNumberWithCommas(totalSpending)} đ
      </span>
    ),
  },
  {
    title: "Phần trăm",
    dataIndex: "percent",
    key: "percent",
    render: (_, { percent }) => (
      <span className="whitespace-nowrap">{percent} %</span>
    ),
  },
];
const Dashboard = () => {
  const { user } = useUser();
  const { expenses, setExpenses } = useExpenses();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [data, setData] = useState<
    {
      type: string;
      percent: number;
      totalSpending: number;
      alias: string;
    }[]
  >([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const _expenses = await ExpenseService.getAllExpenses(user?.id);
        console.log("expenses", _expenses);
        if (_expenses) {
          setExpenses(_expenses);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    if (expenses?.length == 0) fetchExpenses();
  }, []);

  useEffect(() => {
    const _categories = {};
    for (let i = 0; i < expenses.length; i++) {
      if (!_categories[expenses[i]?.categoryId?.id]) {
        _categories[expenses[i]?.categoryId?.id] = expenses[i]?.categoryId;
      }
    }
    const _data: {
      type: string;
      percent: number;
      totalSpending: number;
      alias: string;
    }[] = [];
    const _temp = Object.values(_categories) as ICategory[];
    const total = expenses.reduce((total, exp) => total + exp.totalSpending, 0);
    for (let i = 0; i < _temp.length; i++) {
      const subTotal = expenses
        .filter((exp) => exp?.categoryId?.id == _temp?.[i]?.id)
        .reduce((total, exp) => total + exp.totalSpending, 0);
      _data.push({
        type: _temp[i]?.name,
        percent: Math.floor((subTotal / total) * 100),
        totalSpending: subTotal,
        alias: _temp[i]?.name,
      });
    }
    setData(_data);
    setCategories(_temp);
  }, [expenses]);
  const config = {
    data: data,
    angleField: "percent",
    colorField: "type",
    label: {
      text: ({ percent }) => percent + "%",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        layout: {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        },
      },
    },
    scale: {
      color: {
        palette: "category10",
        offset: (t) => t * 0.1 + 0.1,
      },
    },
  };
  return (
    <Page className="flex flex-col gap-4">
      <section className="flex items-start gap-4 p-4 bg-primary">
        <img
          src={user?.avatar}
          alt=""
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-2 text-white">
          <h1>Welcome,</h1>
          <h1>{user?.name}</h1>
        </div>
      </section>
      {data?.length == 0 ? (
        <Empty />
      ) : (
        <>
          <section className="flex flex-col gap-4 p-4">
            <h1 className="text-primary">Expenses listing</h1>
            <Table
              columns={columns}
              dataSource={data.map((record, index) => ({
                index: index + 1,

                name: record?.type,

                totalSpending: record?.totalSpending,
                percent: record?.percent,
              }))}
              pagination={{ pageSize: 5 }}
            ></Table>
          </section>
          <section className="flex flex-col gap-4 p-4">
            <h1 className="text-primary">Categories Statistic</h1>
            <Pie {...config} scrollbar={{ y: 0 }} />
          </section>
        </>
      )}

      {isLoading && <LoadingModal />}
    </Page>
  );
};

export default Dashboard;
