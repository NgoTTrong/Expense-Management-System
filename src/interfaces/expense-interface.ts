import ICategory from "./category-interface";

export interface IExpense {
  id: number;
  name: string;
  totalSpending: number;
  datetime: Date;
  categoryId: ICategory;
  userId: number;
}
