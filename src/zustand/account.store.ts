import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import api from "../api/api";
import { Post } from "../api/lists.api";

interface AccountState {
  date: string;
  category: string;
  description: string;
  amount: string;
  data: Post[];
  setDate: (date: string) => void;
  setCategory: (category: string) => void;
  setDescription: (description: string) => void;
  setAmount: (amount: string) => void;
  setData: (data: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, post: Post) => void;
  deletePost: (id: string) => void;
}

const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      date: "",
      category: "",
      description: "",
      amount: "",
      data: [],
      setDate: (date) => set({ date }),
      setCategory: (category) => set({ category }),
      setDescription: (description) => set({ description }),
      setAmount: (amount) => set({ amount }),
      setData: (data) => set({ data }),
      // setData: (payload) => {
      //   set((state) => ({
      //     ...state,
      //     data: payload,
      //   }));
      // },
      addPost: async (post: Post) => {
        try {
          const addedPost = await api.lists.addList(post);
          set((state) => ({ data: [...state.data, post] }));
        } catch (error) {
          console.log("포스트 추가를 실패했습니다.", error);
        }
      },
      updatePost: async (id, updatedPost) => {
        const post = await api.lists.updateList(id, updatedPost);
        set((state) => ({
          data: state.data.map((p) => (p.id === id ? post : p)),
        }));
      },
      deletePost: async (id) => {
        await api.lists.deleteList(id);
        set((state) => ({
          data: state.data.filter((post) => post.id !== id),
        }));
      },
    }),
    {
      name: "account-store",
      // getStorage: () => localStorage,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAccountStore;
