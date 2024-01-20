"use client";

import * as React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Card } from "@nextui-org/react";
import { useDateStore } from "@/zustand";

export default function SessionCalendar() {
  const { selectedDate, setSelectedDate } = useDateStore();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Card className="h-max my-6">
        <DemoContainer components={["DateCalendar", "DateCalendar"]}>
          <DemoItem aria-label="Controlled calendar">
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </DemoItem>
        </DemoContainer>
      </Card>
    </LocalizationProvider>
  );
}
