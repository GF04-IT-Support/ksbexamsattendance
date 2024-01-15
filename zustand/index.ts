import { create } from "zustand";
import moment from "moment";

interface DateState {
  selectedDate: moment.Moment;
  setSelectedDate: (date: moment.Moment) => void;
}

export const useDateStore = create<DateState>((set) => ({
  selectedDate: moment(),
  setSelectedDate: (date: moment.Moment): void => set({ selectedDate: date }),
}));
