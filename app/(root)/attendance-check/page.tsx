import StaffAttendanceTab from "@/components/tabs/StaffAttendanceTab";
import { getAllStaffAssignmentsForSession } from "@/lib/actions/session.action";
import { Typography } from "@mui/material";
import React from "react";

export default async function AttendanceCheck({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  if (!searchParams) return null;

  const venueId = searchParams.venue_id;
  const examId = searchParams.exam_id;

  const { staffAssignmentsWithAttendance, examDetails } =
    await getAllStaffAssignmentsForSession(venueId, examId);

  return (
    <div className="pt-4 px-4">
      <div className="flex flex-row gap-2 py-4 justify-center">
        <Typography variant="h5">
          {new Date(examDetails?.date).toLocaleDateString()},
        </Typography>
        <Typography variant="h5">
          {examDetails?.start_time} - {examDetails?.end_time} at
        </Typography>

        <Typography variant="h5">{examDetails?.venue}</Typography>
      </div>
      <StaffAttendanceTab data={staffAssignmentsWithAttendance} />
    </div>
  );
}
