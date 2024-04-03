import AttendanceHeader from "@/components/shared/AttendanceHeader";
import StaffAttendanceTab from "@/components/tabs/StaffAttendanceTab";
import { getAllStaffAssignmentsForSession } from "@/lib/actions/session.action";
import { useAttendanceDetails } from "@/zustand";
import { Divider } from "@nextui-org/react";
import React from "react";
import { Toaster } from "react-hot-toast";

export default async function AttendanceCheck({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  if (!searchParams) return null;

  const venueId = searchParams.venue_id;
  const examId = searchParams.exam_id;

  const { staffAssignmentsWithAttendance, examDetails }: any =
    await getAllStaffAssignmentsForSession(venueId, examId);

  return (
    <div className="relative pt-4 max-sm:px-4">
      <Toaster position="top-center" />
      <AttendanceHeader examId={examId} venueId={venueId} />

      <div className="flex flex-row flex-wrap gap-2 py-4 items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Date</span>{" "}
          <p className="max-[540px]:text-lg text-xl max-[417px]:text-base">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(examDetails?.date))}
          </p>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Time</span>{" "}
          <p className="max-[540px]:text-lg text-xl max-[417px]:text-base text-center">
            {examDetails?.start_time} - {examDetails?.end_time}
          </p>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Block</span>{" "}
          <p className="max-[540px]:text-lg text-xl max-[417px]:text-base text-center">
            {examDetails?.venue.replace("PG", "")}
          </p>
        </div>
      </div>

      <Divider className="my-4 mb-6" />

      <StaffAttendanceTab data={staffAssignmentsWithAttendance} />
    </div>
  );
}
