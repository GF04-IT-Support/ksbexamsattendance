"use client";

import { getAllStaffAssignmentsForSession } from "@/lib/actions/session.action";
import { useAttendanceDetails } from "@/zustand";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoRefreshCircleOutline } from "react-icons/io5";

const AttendanceHeader = ({ venueId, examId }: any) => {
  const [loading, setLoading] = useState(false);
  const { setStaffAssignment } = useAttendanceDetails();

  const handleRefreshClick = async () => {
    try {
      setLoading(true);
      const result: any = await getAllStaffAssignmentsForSession(
        venueId,
        examId
      );
      setStaffAssignment(result.staffAssignmentsWithAttendance);
    } catch (error) {
      toast.error("Failed to refresh data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-between">
      <Link href="/">
        <FaCircleArrowLeft size={28} className="hover:opacity-50" />
      </Link>
      <IoRefreshCircleOutline
        size={32}
        className={`hover:opacity-50 cursor-pointer ${
          loading ? "animate-spinner-ease-spin" : ""
        }`}
        onClick={handleRefreshClick}
      />
    </div>
  );
};

export default AttendanceHeader;
