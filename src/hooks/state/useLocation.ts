import { create } from 'zustand'

interface LocationState {
  location: string
  setLocation: (location: string) => void
}

export const useLocation = create<LocationState>((set) => ({
  location: 'New York, NY',
  setLocation: (location) => set({ location }),
}))
