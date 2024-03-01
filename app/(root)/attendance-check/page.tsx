import StaffAttendanceTab from "@/components/tabs/StaffAttendanceTab";
import { getAllStaffAssignmentsForSession } from "@/lib/actions/session.action";
import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

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
    <div className="relative pt-4 px-4">
      <Link href="/" className="absolute top-50 left-4">
        <FaArrowLeft size={24} className="hover:opacity-50" />
      </Link>

      <div className="flex flex-row gap-2 py-4 mt-4 justify-center">
        <p className="max-[540px]:text-lg text-2xl max-[417px]:text-base">
          {new Date(examDetails?.date).toLocaleDateString("en-GB")},
        </p>

        <p className="max-[540px]:text-lg text-2xl max-[417px]:text-base text-center">
          {examDetails?.start_time} - {examDetails?.end_time},
        </p>

        <p className="max-[540px]:text-lg text-2xl max-[417px]:text-base text-center">
          {examDetails?.venue}
        </p>
      </div>

      <StaffAttendanceTab data={staffAssignmentsWithAttendance} />
    </div>
  );
}
