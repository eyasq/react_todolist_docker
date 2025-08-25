import {create} from 'zustand'
import {persist} from 'zustand/middleware'


//state.todos to access the todos in the zustand store

export const userStore = create((set, get, store) => ({
  user: {},
  addUser: (userdata) =>
    set((state) => ({
      user: { ...state.user, ...userdata }
    })),
  reset: () => set(store.getInitialState())
}));