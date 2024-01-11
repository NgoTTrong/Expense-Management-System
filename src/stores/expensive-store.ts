import { create } from "zustand";
import { IExpense } from "../interfaces/expense-interface";

type State = {
  expenses: IExpense[];
};

type Action = {
  setExpenses: (_expenses: IExpense[]) => void;
};

const useExpenses = create<State & Action>((set) => ({
  expenses: [],
  setExpenses: (_expenses) => set(() => ({ expenses: _expenses })),
}));
export default useExpenses;
