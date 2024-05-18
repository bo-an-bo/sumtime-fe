import { create } from 'zustand'
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
