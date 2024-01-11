import { create } from "zustand";
import IUser from "../interfaces/user-interface";

type State = {
  user: IUser | null;
};

type Action = {
  setUser: (_user: IUser) => void;
};

const useUser = create<State & Action>((set) => ({
  user: null,
  setUser: (_user) => set(() => ({ user: _user })),
}));
export default useUser;
