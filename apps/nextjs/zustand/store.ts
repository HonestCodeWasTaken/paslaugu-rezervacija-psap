import { create } from "zustand";

type IOption =
  | "calendar"
  | "reservations"
  | "orders"
  | "notifications"
  | "none"
  | "currentBusiness"
  | "currentServices"
  | "addService"
  | "addBusiness";

interface BearState {
  selectedOption: IOption;
  setSelectedOption: (option: IOption) => void;
}

export const useSelectedOptionStore = create<BearState>()((set) => ({
  selectedOption: "none",
  setSelectedOption: (option) => set((state) => ({ selectedOption: option })),
}));
