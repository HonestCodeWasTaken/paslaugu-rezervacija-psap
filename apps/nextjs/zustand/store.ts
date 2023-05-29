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

type Notifications = {
  userId: string;
  timestamp: string;
  message: string;
  isRead: boolean;
  type: string;
};

interface BearState {
  selectedOption: IOption;
  setSelectedOption: (option: IOption) => void;
}

interface NotificationsState {
  notifications: Notifications[];
  setNotifications: (notifications: Notifications[]) => void;
  addNotification: (notification: Notifications) => void;
  clearNotifications: () => void;
}

export const useSelectedOptionStore = create<BearState>()((set) => ({
  selectedOption: "none",
  setSelectedOption: (option) => set((state) => ({ selectedOption: option })),
}));

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  setNotifications: (notifications: Notifications[]) =>
    set(() => ({ notifications })),
  addNotification: (notification: Notifications) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  clearNotifications: () => set(() => ({ notifications: [] })),
}));
