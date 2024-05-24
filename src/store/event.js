import { create } from 'zustand'
// 이벤트 아이디
export const useEventStore = create((set) => ({
    eventId: '',
    setEventId: (data) => set({ eventId: data }),
}))

// export default useEventStore

// 테이블에서 가져올 멤버의 정보
export const useTableMemInfo = create((set) => ({
    memName: [],
    setMemName: (data) => set({ memName: data }),
    // setMemName: (data) =>
    //     set((prev) => ({
    //         memName: [...prev.memName, data],
    //     }))
}))

export const useDayStore = create((set) => ({
    startDate: '',
    endDate: '',
    setStartDate: (data) => set({ startDate: data }),
    setEndDate: (data) => set({ endDate: data }),
}))

// 내역 정렬
export const useSort = create((set) => ({
    sort: '',
    setSort: (data) => set({ sort: data }),
}))
