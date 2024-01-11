import { supabase } from "./supabase-client";

export default class UserService {
  static login = async (zaloId: string, name: string, avatar: string) => {
    try {
      const { data: _user } = await supabase
        .from("User")
        .select()
        .match({ zaloId });
      if (_user && _user?.length > 0) {
        return _user?.[0];
      }
      await supabase.from("User").insert({ zaloId, name, avatar });
      const { data: createdUser } = await supabase
        .from("User")
        .select()
        .match({ zaloId });
      return createdUser?.[0];
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  static update = async (userId?: number, name?: string, phone?: string) => {
    try {
      await supabase.from("User").update({ name, phone }).match({ id: userId });
    } catch (error) {}
  };
}
