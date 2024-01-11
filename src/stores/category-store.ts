import { create } from "zustand";
import ICategory from "../interfaces/category-interface";

type State = {
  categories: ICategory[];
};

type Action = {
  setCategories: (_categories: ICategory[]) => void;
};

const useCategories = create<State & Action>((set) => ({
  categories: [],
  setCategories: (_categories) => set(() => ({ categories: _categories })),
}));
export default useCategories;
