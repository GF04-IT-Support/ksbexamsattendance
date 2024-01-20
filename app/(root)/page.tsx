"use client";

import SessionCalendar from "@/components/calendars/SessionCalendar";
import SessionCard from "@/components/cards/SessionCard";
import { Divider, Drawer } from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default function Home() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <div className="flex max-lg:flex-col gap-4">
      <div className="lg:hidden sticky top-0 z-10 overflow-auto">
        <div className="m-4 flex justify-end mr-6">
          <CalendarIcon
            className="hover:cursor-pointer hover:opacity-50"
            onClick={handleDrawerOpen}
          />
        </div>
        <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
          <div className="p-4 flex flex-col gap-2 justify-center items-center">
            <IoIosCloseCircle
              onClick={handleDrawerClose}
              className="self-end justify-end hover:opacity-50 cursor-pointer"
              size={24}
            />
            <SessionCalendar />
          </div>
        </Drawer>
        <Divider flexItem />
      </div>
      <div className="flex-grow pt-5">
        <SessionCard />
      </div>
      <Divider className="max-lg:hidden" orientation="vertical" flexItem />
      <div className="max-lg:hidden min-w-[360px] sticky top-0 h-screen overflow-auto p-4">
        <SessionCalendar />
      </div>
    </div>
  );
}
