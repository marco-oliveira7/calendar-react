import { useEffect, useState } from "react";
import Calendar from "./components/calendar/calendar.jsx";
import Dates from "./components/dates/dates.jsx";
import Tasks from "./components/tasks/tasks.jsx";
import { IconBrightnessDownFilled } from "@tabler/icons-react";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [taskDays, setTaskDay] = useState([]);
  const [taskMonths, setTaskMonths] = useState([]);
  const [names, setNames] = useState([]);
  const [hours, setHours] = useState([]);
  const [minutes, setMinutes] = useState([]);
  const [indexs, setIndexs] = useState([0]);
  const [index, setIndex] = useState(0);
  const [actualIndex, setActualIndex] = useState();
  const [nameTask, setNameTask] = useState("");
  const [hourTask, setHourTask] = useState("");
  const [minuteTask, setMinuteTask] = useState("");

  function addDate(day, currentMonth, currentYear) {
    setSelectedDay(day);
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  }

  function saveDate(index, name, hour, minute, day, month) {
    setSelectedDay(null);
    if (hour > 23 || hour < 0 || minute > 60 || minute < 0) {
      alert("O horário nao é válido");
    } else {
      if (isEditing) {
        names[actualIndex] = name;
        hours[actualIndex] = hour;
        minutes[actualIndex] = minute;
      } else {
        setIndex((i) => i + 1);
        setIndexs([...indexs, index]);
        setIsEditing(false);
        setNames([...names, name]);
        setHours([...hours, hour]);
        setMinutes([...minutes, minute]);
        setTaskDay([...taskDays, day]);
        setTaskMonths([...taskMonths, month]);
      }
    }
    setIsEditing(false);
  }

  function cancelDate() {
    setSelectedDay(null);
    setNameTask("");
    setHourTask("");
    setMinuteTask("");
    setIsEditing(false);
  }

  function deleteTask(index) {
    setSelectedDay(null);
    const newDays = taskDays.filter((_, i) => i !== index);
    const newMonths = taskMonths.filter((_, i) => i !== index);
    const newNames = names.filter((_, i) => i !== index);
    const newHours = hours.filter((_, i) => i !== index);
    const newMinutes = minutes.filter((_, i) => i !== index);
    setNames(newNames);
    setHours(newHours);
    setMinutes(newMinutes);
    setTaskDay(newDays);
    setTaskMonths(newMonths);
  }

  function editTask(index, day, month, name, hour, minute) {
    setActualIndex(index);
    setIsEditing(true);
    setSelectedMonth(month);
    setSelectedYear("2025");
    setNameTask(name);
    setHourTask(hour);
    setMinuteTask(minute);
    setSelectedDay(day);
  }

  function switchTheme() {
    const body = document.body.getAttribute("data-theme");
    if (body === "cupcake") {
      document.body.setAttribute("data-theme", "coffee");
      document.body.classList.replace("cupcake", "coffee");
    } else if (body === "coffee") {
      document.body.setAttribute("data-theme", "dark");
      document.body.classList.replace("coffee", "dark");
    } else if (body === "dark") {
      document.body.setAttribute("data-theme", "cupcake");
      document.body.classList.replace("dark", "cupcake");
    }
  }

  return (
    <div className="w-screen flex flex-row-reverse justify-between app">
      <ul className="flex flex-col w-1/4 mt-10 tasks pb-10">
        <h1 className="font-bold text-2xl text-center">Tasks To Do</h1>
        {names.map((name, index) => (
          <Tasks
            key={index}
            index={index}
            name={name}
            hours={hours[index]}
            minutes={minutes[index]}
            day={taskDays[index]}
            month={taskMonths[index]}
            editTask={editTask}
            deleteTask={() => deleteTask(index)}
          />
        ))}
      </ul>
      {selectedDay ? (
        <Dates
          cancelDate={cancelDate}
          saveDate={saveDate}
          day={selectedDay}
          month={selectedMonth}
          year={selectedYear}
          name={nameTask}
          hours={hourTask}
          minutes={minuteTask}
          index={index}
        />
      ) : (
        <Calendar addDate={addDate} />
      )}
      <IconBrightnessDownFilled
        onClick={switchTheme}
        className="self-end h-10 w-10"
      />
    </div>
  );
}
