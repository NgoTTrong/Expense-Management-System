import { supabase } from "./supabase-client";

export default class CategoryService {
  static getAllCategories = async () => {
    try {
      const { data: categories } = await supabase.from("Category").select();
      return categories;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
}
