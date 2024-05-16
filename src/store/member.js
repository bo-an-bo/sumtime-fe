import { create } from 'zustand'

// Tables
export const useSelectedRows = create((set) => ({
    selectedRows: [],
    setSelectedRows: (data) => set({ selectedRows: data }),
}))

export const useSelectedRowKeys = create((set) => ({
    selectedRowKeys: [],
    setSelectedRowKeys: (data) => set({ selectedRowKeys: data }),
}))

export const useDeleteMemberIds = create((set) => ({
    deleteMemberIds: [],
    setDeleteMemberIds: (data) => set({ deleteMemberIds: data }),
}))
