import SessionCalendar from "@/components/calendars/SessionCalendar";
import SessionCard from "@/components/cards/SessionCard";
import { Divider } from "@mui/material";

export default function Home() {
  return (
    <div className="flex gap-4">
      <div className="w-3/4 px-10 pt-10">
        <SessionCard />
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="w-1/4 sticky top-0 h-screen overflow-auto p-4">
        <SessionCalendar />
      </div>
    </div>
  );
}
