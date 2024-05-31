import { create } from 'zustand'

export const useGroupStore = create((set) => ({
    groupId: '',
    setGroupId: (groupId) => set({ groupId }),
}))
