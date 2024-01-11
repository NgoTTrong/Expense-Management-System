import { IExpense } from "../interfaces/expense-interface";
import { supabase } from "./supabase-client";

export default class ExpenseService {
  static getAllExpenses = async (userId?: number) => {
    try {
      const { data: expenses } = await supabase
        .from("SpendingHistory")
        .select("*,categoryId(*)")
        .match({ userId: userId });
      if (expenses) return expenses as IExpense[];
    } catch (error) {}
    return [];
  };
  static addAnExpense = async (
    userId?: number,
    name?: string,
    totalSpending?: number,
    datetime?: Date,
    categoryId?: number
  ) => {
    try {
      await supabase.from("SpendingHistory").insert({
        userId,
        name,
        totalSpending,
        datetime,
        categoryId,
      });
    } catch (error) {}
  };
}
