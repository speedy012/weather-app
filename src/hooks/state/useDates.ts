import { create } from 'zustand'

interface DateState {
  initialDate: string
  setInitialDate: (initialDate: string) => void
  futureDate: string
  setFutureDate: (futureDate: string) => void
}

export const useDates = create<DateState>((set) => ({
  initialDate: '',
  setInitialDate: (initialDate) => set({ initialDate }),
  futureDate: '',
  setFutureDate: (futureDate) => set({ futureDate }),
}))
