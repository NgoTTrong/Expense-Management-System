import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";
import { formatNumberWithCommas } from "../../utils/functions";
import useCategories from "../../stores/category-store";
import LoadingModal from "../../components/loading/loading-modal";
import CategoryService from "../../services/category-service";
import useExpenses from "../../stores/expensive-store";
import ExpenseService from "../../services/expense-service";
import useUser from "../../stores/user-store";
import dayjs from "dayjs";
import ICategory from "../../interfaces/category-interface";
import Empty from "../../components/commons/empty";

const Budget = () => {
  const { user } = useUser();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { expenses, setExpenses } = useExpenses();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<number>(0);
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
    setCategories(Object.values(_categories) as ICategory[]);
  }, [expenses]);
  return (
    <Page className="flex flex-col gap-4 p-4">
      <section className="border border-solid border-primary rounded-lg p-4 flex flex-col gap-4 w-full">
        <div className="w-full flex items-center justify-between">
          <span className="font-semibold text-sm text-[#707974]">
            Total spend:
          </span>
          <span className="font-semibold text-sm text-[#707974]">
            {formatNumberWithCommas(
              expenses?.reduce((total, exp) => total + exp?.totalSpending, 0)
            )}{" "}
            vnđ
          </span>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="font-semibold text-sm text-[#707974]">
            Belong to categories:
          </h1>
          <section className="grid grid-cols-4 gap-4">
            {categories?.map((category) => (
              <div
                onClick={() => {
                  setFilter((state) =>
                    state == 0 || state != category?.id ? category?.id : 0
                  );
                }}
                key={category?.id}
                className={`flex items-center justify-center`}
              >
                <div
                  className={`flex items-center justify-center p-2  border-[2px] border-solid border-[#e65abc] rounded-full  ${
                    filter == category?.id && "bg-[#40e5fb]"
                  }`}
                >
                  <img
                    src={category?.icon}
                    alt=""
                    className="h-[18px] w-[18px] object-cover"
                  />
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
      {expenses?.length == 0 ? (
        <Empty />
      ) : (
        <section className="flex flex-col gap-4">
          <h1 className="text-primary">Cash</h1>

          <div className="flex flex-col gap-4">
            {expenses
              ?.filter((exp) =>
                filter == 0 ? true : exp?.categoryId?.id == filter
              )
              ?.map((expense) => {
                return (
                  <div
                    key={"expense-" + expense.id}
                    className="flex items-start justify-between w-full border border-solid border-primary rounded-lg p-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.25)]"
                  >
                    <section className="flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center p-2  border-[2px] border-solid border-[#e65abc] rounded-full`}
                      >
                        <img
                          src={expense?.categoryId?.icon}
                          alt=""
                          className="h-[18px] w-[18px] object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-[#747875]">
                          {dayjs(expense?.datetime).format("DD/MM/YYYY")}
                        </span>
                        <h1 className="text-sm my-0">{expense?.name}</h1>
                      </div>
                    </section>
                    <span className="font-semibold text-sm text-[#707974]">
                      {formatNumberWithCommas(expense?.totalSpending)} vnđ
                    </span>
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {isLoading && <LoadingModal />}
    </Page>
  );
};

export default Budget;
