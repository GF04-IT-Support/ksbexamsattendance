"use server";

import prisma from "@/utils/prisma";

export async function getSessions({ date }: { date: Date }) {
  try {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();

    const exams = await prisma.exam.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const allVenues = await prisma.venue.findMany();
    const venueNameToIdMap = allVenues.reduce((acc: any, venue: any) => {
      acc[venue.name] = venue.venue_id;
      return acc;
    }, {});

    const examsWithVenues = exams.map((exam) => {
      const venueNames = exam.venue.split(",").map((name) => name.trim());

      const venues = venueNames.map((name) => ({
        name,
        venue_id: venueNameToIdMap[name] || null,
        isAttendanceCompleteForVenue: null,
      }));

      return {
        exam_id: exam.exam_id,
        date: exam.date,
        start_time: exam.start_time,
        end_time: exam.end_time,
        exam_code: exam.exam_code,
        venues,
      };
    });

    for (const exam of examsWithVenues) {
      for (const venue of exam.venues) {
        const session = await prisma.examSession.findFirst({
          where: {
            exam_id: exam.exam_id,
            venue_id: venue.venue_id,
          },
          include: {
            assignments: true,
            attendances: true,
          },
        });

        if (session) {
          const isAttendanceComplete = session.assignments.every((assignment) =>
            session.attendances.some(
              (attendance) => attendance.staff_id === assignment.staff_id
            )
          );

          venue.isAttendanceCompleteForVenue =
            isAttendanceComplete as unknown as null;
        }
      }
    }

    return examsWithVenues;
  } catch (error: any) {
    console.error(error);
    return {
      message: "Problems in fetching sessions with venues and attendance",
    };
  }
}

export async function getAllStaffAssignmentsForSession(
  venueId: string,
  examId: string
) {
  try {
    const examSessions = await prisma.examSession.findMany({
      where: {
        exam_id: examId,
        venue_id: venueId,
      },
      include: {
        exam: true,
        venue: true,
        assignments: {
          include: {
            staff: true,
          },
        },
      },
    });

    const examDetails = {
      date: examSessions[0].exam.date,
      start_time: examSessions[0].exam.start_time,
      end_time: examSessions[0].exam.end_time,
      venue: examSessions[0].venue.name,
    };

    const staffAssignmentsWithAttendance = [];

    for (const session of examSessions) {
      for (const assignment of session.assignments) {
        const attendance = await prisma.attendance.findFirst({
          where: {
            staff_id: assignment.staff_id,
            exam_session_id: session.exam_session_id,
          },
        });

        staffAssignmentsWithAttendance.push({
          id: assignment.id,
          staff_id: assignment.staff_id,
          staff_name: assignment.staff?.staff_name,
          exam_session_id: session.exam_session_id,
          role: assignment.role,
          staff_role: assignment.staff?.staff_role,
          department: assignment.staff?.department,
          attendance_status: attendance?.attendance_status || null,
          attendance_id: attendance?.attendance_id || null,
        });
      }
    }

    return { staffAssignmentsWithAttendance, examDetails };
  } catch (error: any) {
    throw new Error("Problems in fetching staff assignments with attendance");
  }
}

export async function takeAttendance(
  staff_id: string,
  exam_session_id: string,
  attendance_status: string
) {
  try {
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        staff_id_exam_session_id: {
          staff_id: staff_id,
          exam_session_id: exam_session_id,
        },
      },
    });

    let attendance;
    if (existingAttendance) {
      attendance = await prisma.attendance.update({
        where: {
          staff_id_exam_session_id: {
            staff_id: staff_id,
            exam_session_id: exam_session_id,
          },
        },
        data: {
          attendance_status: attendance_status,
        },
      });
    } else {
      attendance = await prisma.attendance.create({
        data: {
          staff_id: staff_id,
          exam_session_id: exam_session_id,
          attendance_status: attendance_status,
        },
      });
    }

    return { message: "Attendance taken successfully" };
  } catch (error: any) {
    return { message: "Error in taking attendance" };
  }
}
