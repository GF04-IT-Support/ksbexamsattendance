export function sortDataByStartTime(data: any[]): any[] {
  return data.sort((a, b) => {
    const timeA = convertTo24Hour(a.start_time);
    const timeB = convertTo24Hour(b.start_time);

    return timeA - timeB;
  });
}

const convertTo24Hour = (time: string) => {
  let [hours, minutes] = time.replace(/am|pm/i, "").split(":").map(Number);
  const period = time.toLowerCase().includes("pm") ? "PM" : "AM";

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return hours + minutes / 60;
};
