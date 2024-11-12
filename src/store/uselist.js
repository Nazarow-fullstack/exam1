import { create } from 'zustand'
import { url } from '../config/config'
import axios from 'axios';

export  const useList = create((set) => ({
data:[],
getUsers: async () => {
    try {
      const response = await axios.get(`${url}/ToDo/get-to-dos`);
      set({ data: response.data.data });
    } catch (error) {
      console.error(error);
    }
  },
  deleteUser: async (id) => {
    try {
      await axios.delete(`${url}/ToDo/delete-to-do?id=${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  },
  name: "",
  setName: (value) => set(() => ({ name: value })),
  idx: null,
  setIdx: (value) => set(() => ({ idx: value })),
  modalEdit: false,
  setModalEdit: (status) => set(() => ({ modalEdit: status })),
}))