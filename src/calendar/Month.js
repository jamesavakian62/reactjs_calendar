import React from "react";
import { Day } from "./Day";
import { getCalendarInfo } from "../utilities/getCalendarInfo";

const pluralize = (count, noun, suffix = "s") =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;

export const Month = ({ year, month, methods, events }) => {
  const {
    preDays,
    monthDays,
    postDays,
    today,
    isCurrentMonth,
    weekDayNames,
    monthNames,
  } = getCalendarInfo(month, year);

  const eventsOfTheMonth = events.filter(
    (events) => events.year === year && events.month === month
  );

  function removeMonthEvents() {
    methods.deleteEventsByMonth(year, month);
  }

  return (
    <div className="Calendar">
      <h1 className="center">Month Calendar</h1>
      <div className="TopLine">
        <div className="MonthName">
          <span>
            {monthNames[month]} {year}
          </span>
        </div>
        <div className="MonthLister">
          <div
            className="arrow arrow-left"
            onClick={() => methods.navigate(-1)}
          >
            <div></div>
          </div>
          <div className="today" onClick={() => methods.navigateToToday()}>
            Today
          </div>
          <div
            className="arrow arrow-right"
            onClick={() => methods.navigate(1)}
          >
            <div></div>
          </div>
        </div>
      </div>

      <div className="DayNames">
        {weekDayNames.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </div>

      <div className="MonthDays">
        {preDays.map((day) => (
          <div key={day} className="MonthDay others">
            <div className="dayName">{day}</div>
          </div>
        ))}
        {monthDays.map((day) => (
          <Day
            key={day}
            events={eventsOfTheMonth}
            methods={methods}
            year={year}
            month={month}
            day={day}
            isToday={isCurrentMonth && day === today.date}
          />
        ))}
        {postDays.map((day) => (
          <div key={day} className="MonthDay others">
            <div className="dayName">{day}</div>
          </div>
        ))}
      </div>

      <div className="Footer">
        {pluralize(eventsOfTheMonth.length, "event")} on {monthNames[month]}
        {!!eventsOfTheMonth.length && (
          <a className="RemoveAll" onClick={removeMonthEvents}>
            Remove All
          </a>
        )}
      </div>
      <div className="center">
        <img src="oa.png" alt="Optical Automation Logo" />
      </div>
      <div className="footer-text">
        <p>
          {" "}
          (c) 2022, MyOneUniverse, Optical Automation, LLC, All rights reserved.{" "}
        </p>
      </div>
    </div>
  );
};
