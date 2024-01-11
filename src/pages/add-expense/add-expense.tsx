import React, { useEffect, useState } from "react";
import { Button, DatePicker, Page, useNavigate } from "zmp-ui";
import { InputText } from "../../components/input/InputText";
import CategoryService from "../../services/category-service";
import useCategories from "../../stores/category-store";
import LoadingModal from "../../components/loading/loading-modal";
import { message } from "antd";
import ExpenseService from "../../services/expense-service";
import useUser from "../../stores/user-store";
import useExpenses from "../../stores/expensive-store";

const AddExpense = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const { categories, setCategories } = useCategories();
  const navigate = useNavigate();
  const [form, setForm] = useState<{
    name?: string;
    totalSpend?: number;
    category?: number;
    datetime?: Date;
  }>({});
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const _categories = await CategoryService.getAllCategories();
        if (_categories) setCategories(_categories);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    if (categories?.length == 0) fetchCategories();
  }, []);
  const { setExpenses } = useExpenses();
  const handleAddExpense = async () => {
    if (!form?.name) {
      message.warning("Please enter what you pay for?");
      return;
    }
    if (!form?.totalSpend) {
      message.warning("Please enter total spend");
      return;
    }
    if (!form?.datetime) {
      message.warning("Please enter datetime you paid");
      return;
    }
    if (!form?.category) {
      message.warning("Please choosen category");
      return;
    }
    try {
      setIsLoadingSubmit(true);
      await ExpenseService.addAnExpense(
        user?.id,
        form?.name,
        form?.totalSpend,
        form?.datetime,
        form?.category
      );

      const _expenses = await ExpenseService.getAllExpenses(user?.id);
      if (_expenses) {
        setExpenses(_expenses);
      }
    } catch (error) {
    } finally {
      setIsLoadingSubmit(false);
      message.success("Add expense successfully");
      navigate("/budget", { replace: true });
    }
  };
  return (
    <Page className="flex flex-col gap-4 p-4">
      <h1>Today what's new?</h1>
      <h2 className="text-primary text-medium text-base">Add an expense</h2>
      <InputText
        placeholder="Buy food"
        title="What you pay for?"
        required
        value={form?.name}
        onChange={(event) =>
          setForm((state) => ({ ...state, name: event?.target?.value }))
        }
      />
      <InputText
        placeholder="10000"
        title="Total spend"
        required
        type="number"
        value={form?.totalSpend}
        onChange={(event) =>
          setForm((state) => ({
            ...state,
            totalSpend: Number(event?.target?.value),
          }))
        }
        suffix={<span className="text-primary mr-4">vnđ</span>}
      />
      <InputText placeholder="10000" title="Date spend" required>
        <DatePicker
          onChange={(value) =>
            setForm((state) => ({ ...state, datetime: new Date(value) }))
          }
        />
      </InputText>
      <h2 className="text-primary text-medium text-base">From category</h2>
      <section className="grid grid-cols-4 gap-4">
        {categories?.map((category) => (
          <div
            onClick={() => {
              setForm((state) => ({ ...state, category: category?.id }));
            }}
            key={category?.id}
            className={`flex items-center justify-center`}
          >
            <div
              className={`flex items-center justify-center p-2  border-[2px] border-solid border-[#e65abc] rounded-full  ${
                form?.category == category?.id && "bg-[#40e5fb]"
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
      <Button
        className="w-full rounded-lg"
        loading={isLoadingSubmit}
        onClick={handleAddExpense}
      >
        Confirm
      </Button>
      {isLoading && <LoadingModal />}
    </Page>
  );
};

export default AddExpense;
