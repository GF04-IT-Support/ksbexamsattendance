"use client";

import React from "react";
import { useDateStore } from "@/zustand";
import useSWR from "swr";
import { getSessions } from "@/lib/actions/session.action";
import {
  Card,
  Badge,
  Spinner,
  CardHeader,
  CardBody,
  Chip,
  Button,
} from "@nextui-org/react";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SessionCard() {
  const { selectedDate } = useDateStore();
  const router = useRouter();

  const { data: sessions = [] as any, isLoading } = useSWR(
    `/api/sessions/${selectedDate.toISOString()}`,
    async () => {
      const response: any = await getSessions({ date: selectedDate.toDate() });
      if (response.message) {
        toast.error(response.message);
      }
      return response;
    }
  );

  const handleAttendanceCheck = (
    locked: boolean,
    examId: string,
    venueId: string
  ) => {
    if (locked) {
      toast.error("Session is locked, contact Administrator");
      return;
    }
    router.push(`/attendance-check?venue_id=${venueId}&exam_id=${examId}`, {});
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-grow w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && sessions.length === 0) {
    return (
      <Typography className="text-center" variant="h4">
        No session available
      </Typography>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      <Toaster position="top-center" />
      {sessions.length > 0 &&
        sessions.map((session: any) => (
          <Card
            key={session.exam_id}
            className="p-4 bg-white shadow-lg rounded-lg"
          >
            <CardHeader className="flex justify-between items-center">
              <p className="font-bold">{session.exam_code}</p>
              <Badge color="primary" variant="flat">
                {new Date(session.date).toLocaleDateString()}
              </Badge>
            </CardHeader>
            <CardBody>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Start Time: {session.start_time}
                </p>
                <p className="text-gray-600">End Time: {session.end_time}</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold mb-2">Venue(s):</p>
                {session.venues.map((venue: any, index: number) => (
                  <>
                    <Badge
                      key={index}
                      content=""
                      size="sm"
                      color={
                        venue.isAttendanceCompleteForVenue === null
                          ? "default"
                          : venue.isAttendanceCompleteForVenue
                          ? "success"
                          : "danger"
                      }
                      shape="circle"
                      className="mr-2"
                      placement="bottom-right"
                    >
                      <Button
                        className="mt-2 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
                        size="sm"
                        onClick={() =>
                          handleAttendanceCheck(
                            session.locked,
                            session.exam_id,
                            venue.venue_id
                          )
                        }
                      >
                        {venue.name}
                      </Button>
                    </Badge>
                    {"  "}
                  </>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}
