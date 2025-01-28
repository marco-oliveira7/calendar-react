import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Calendar(props) {
  const currentDate = new Date();

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const natal = new Date(currentYear, 11, 25).getDate();

  const emptyDays = [];
  let countEmpty = 0;
  while (countEmpty < firstDayOfMonth) {
    countEmpty++;
    emptyDays.push("");
  }

  const monthDays = [];
  let countDays = 0;
  while (countDays < daysInMonth) {
    countDays++;
    monthDays.push(countDays);
  }

  function handlePrevMonths() {
    if (currentMonth > 0) {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    } else if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
      setCurrentMonth(11);
    }
  }
  function handleNextMonths() {
    if (currentMonth < 11) {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    } else if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
      setCurrentMonth(0);
    }
  }

  useEffect(() => {
    const days = document.querySelectorAll(".days");
    days.forEach((day) => {
      day.addEventListener("click", () => {
        props.addDate(day.innerHTML, months[currentMonth], currentYear);
      });
      if (
        day.innerHTML === currentDate.getDate().toString() &&
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear()
      ) {
        day.classList.add("today");
      } else if (currentMonth !== currentDate.getMonth()) {
        day.classList.remove("today");
      }
    });
  });
  return (
    <div className="h-screen w-3/4 flex flex-col items-center justify-center container">
      <h1 className="text-2xl font-semibold mb-8">
        {months[currentMonth]} {currentYear}
      </h1>
      <div className="w-3/5 h-1/2 bg-base-300 rounded-2xl box-content p-10 calendar">
        <div className="w-full flex justify-between text-2xl mx-8 weekDays">
          {daysOfWeek.map((day) => (
            <span key={day} className="daysOfWeek">{day}</span>
          ))}
        </div>
        <div className="w-full h-full flex flex-wrap text-2xl items-center justify-start">
          {emptyDays.map((_, index) => (
            <span key={index} className="days">
              &nbsp;
            </span>
          ))}
          {monthDays.map((day) => (
            <span key={day} className="days">
              {day}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute w-3/5 flex justify-between arrows">
        <span className="cursor-pointer btn arrow" onClick={handlePrevMonths}>
          <IconArrowNarrowLeft></IconArrowNarrowLeft>
        </span>
        <span className="cursor-pointer btn arrow" onClick={handleNextMonths}>
        <IconArrowNarrowRight></IconArrowNarrowRight>
        </span>
      </div>
    </div>
  );
}
