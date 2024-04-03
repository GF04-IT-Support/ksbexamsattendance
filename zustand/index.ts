import { create } from "zustand";
import moment from "moment";

interface DateState {
  selectedDate: moment.Moment;
  setSelectedDate: (date: moment.Moment) => void;
}

interface AttendanceDetailsState {
  staffAssignment: any;
  setStaffAssignment: (staffAssignment: any) => void;
}

export const useDateStore = create<DateState>((set) => ({
  selectedDate: moment(),
  setSelectedDate: (date: moment.Moment): void => set({ selectedDate: date }),
}));

export const useAttendanceDetails = create<AttendanceDetailsState>((set) => ({
  staffAssignment: [],
  setStaffAssignment: (staffAssignment: any): void => set({ staffAssignment }),
}));
