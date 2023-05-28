import React, { useState } from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs());

  const generateWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        currentWeek.startOf("week").add(i, "day").format("dddd, MMM D"),
      );
    }
    return days;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let j = 0; j < 4; j++) {
      slots.push(2);
    }
    return slots;
  };
  const generateTimeSlotsInHour = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(1);
    }
    return slots;
  };

  return (
    <div className="p-1 w-full max-h-max">
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => setCurrentWeek(currentWeek.subtract(1, "week"))}
        >
          Previous Week
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => setCurrentWeek(currentWeek.add(1, "week"))}
        >
          Next Week
        </button>
      </div>
      <div className="flex mt-4 overflow-auto max-h-full">
        <div className=" border-gray-200">
          <div className=" h-16" />
          {Array.from({ length: 24 }, (_, i) => i + 1).map((time, index) => (
            <div
              key={index}
              className="border-b  border-gray-100 h-16 flex items-center"
            >
              {time}:00
            </div>
          ))}
        </div>
        <div className="flex-1 flex gap-4 w-full">
          {generateWeekDays().map((day, index) => (
            <div key={index} className=" w-full border-gray-200 h-full">
              <div className="border border-r border-l border-t h-16">
                <h2 className="font-bold text-lg mb-4">{day.split(",")[0]}</h2>
                <h2 className="font-bold text-lg mb-4">{day.split(",")[1]}</h2>
              </div>
              {generateTimeSlotsInHour().map((time, index) => (
                <div
                  key={index}
                  className="border-b border border-gray-100 h-16"
                >
                  {generateTimeSlots().map((slot, index) => (
                    <div
                      key={index}
                      className="w-full h-1/4"
                      style={{ height: "25%" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
