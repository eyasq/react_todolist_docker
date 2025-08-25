import {create} from 'zustand'


//state.todos to access the todos in the zustand store

export const userStore = create((set, get, store) => ({
  user: {},
  loggedIn:false,
  addUser: (userdata) =>
    set((state) => ({
      user: { ...state.user, ...userdata }
    })),
  reset: () => set(store.getInitialState())
  
}));