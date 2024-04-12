"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Tabs, Tab, Checkbox, Card, Chip } from "@nextui-org/react";
import { StaffTabsLinks } from "@/lib/constants";
import { Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { takeAttendance } from "@/lib/actions/session.action";
import { useAttendanceDetails } from "@/zustand";
import { useRouter } from "next/navigation";

export default function StaffAttendanceTab({ data }: any) {
  const { staffAssignment, setStaffAssignment } = useAttendanceDetails();
  const [selectedTab, setSelectedTab] = useState<any>(StaffTabsLinks[0].id);
  const [attendance, setAttendance] = useState<any>(
    data.map((staff: any) => ({
      ...staff,
      attendance_status: staff.attendance_status || null,
    }))
  );
  const router = useRouter();

  useEffect(() => {
    setStaffAssignment(data);
  }, [data]);

  useEffect(() => {
    setAttendance(
      staffAssignment.map((staff: any) => ({
        ...staff,
        attendance_status: staff.attendance_status || null,
      }))
    );
  }, [staffAssignment]);

  const handleAttendanceChange = async (
    staffId: string,
    examSessionId: string,
    staffName: string,
    checked: boolean
  ) => {
    try {
      const status = checked ? "Present" : null;

      setAttendance((currentAttendance: any) =>
        currentAttendance.map((staff: any) => {
          if (staff.staff_id === staffId) {
            return { ...staff, attendance_status: status };
          }
          return staff;
        })
      );

      const response = await takeAttendance(staffId, examSessionId, status);

      if (response.message === "Attendance taken successfully") {
        if (status === "Present") {
          toast.success(
            `${staffName}'s attendance has been taken successfully.`
          );
        }
      } else {
        toast.error(response.message);
        router.replace("/");
      }
    } catch (error) {
      toast.error("Failed to take attendance. Please try again later.");
    }
  };

  const filteredData = attendance.filter(
    (staff: any) => staff.role === selectedTab
  );

  const total = useMemo(() => {
    return StaffTabsLinks.map((tab) => {
      const filtered = attendance.filter(
        (staff: any) =>
          staff.attendance_status !== "Present" && staff.role === tab.id
      );
      return {
        id: tab.id,
        label: tab.label,
        total: filtered.length,
      };
    });
  }, [attendance]);

  return (
    <div className="flex w-full flex-col">
      <Toaster position="top-center" />
      <Tabs
        key={total.map((t) => t.total).join(",")}
        color="primary"
        aria-label="Dynamic tabs"
        items={StaffTabsLinks}
        fullWidth
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
      >
        {(item) => (
          <Tab
            key={item.id}
            title={
              <div className="flex items-center space-x-2">
                {item.icon}
                <span className="max-sm:hidden">{item.label}</span>
                {total.find((tab) => tab.id === item.id)?.total > 0 && (
                  <Chip color="danger">
                    {`${total.find((tab) => tab.id === item.id)?.total}`}
                  </Chip>
                )}
              </div>
            }
          />
        )}
      </Tabs>
      {filteredData.length === 0 ? (
        <div className=" flex flex-1 items-center justify-center mt-20">
          <Typography variant="h4">No Staff Assigned</Typography>
        </div>
      ) : (
        <Card className="mx-auto  sm:w-1/2 w-full my-4 flex justify-center p-8">
          {filteredData.map((staff: any) => (
            <div
              key={staff.staff_id}
              className="flex items-center justify-between my-2 p-2"
            >
              <span className="flex-1">{staff.staff_name}</span>
              <Checkbox
                isSelected={staff.attendance_status === "Present"}
                color="success"
                onChange={(e) => {
                  const checked = e.target.checked;
                  handleAttendanceChange(
                    staff.staff_id,
                    staff.exam_session_id,
                    staff.staff_name,
                    checked
                  );
                }}
              ></Checkbox>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
