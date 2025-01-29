import { useEffect, useState } from "react";

export default function Dates(props) {
  const [dateName, setDateName] = useState(props.name);
  const [dateHours, setDateHours] = useState(props.hours);
  const [dateMinutes, setDateMinutes] = useState(props.minutes);

  function handleDateName(e) {
    setDateName(e.target.value);
  }
  function handleDateHours(e) {
    setDateHours(e.target.value);
  }
  function handleDateMinutes(e) {
    setDateMinutes(e.target.value);
  }

  useEffect(() => {
    setDateName(props.name);
  }, [props.name]);

  useEffect(() => {
    setDateHours(props.hours);
  }, [props.hours]);

  useEffect(() => {
    setDateMinutes(props.minutes);
  }, [props.minutes]);

  return (
    <div className="h-screen w-3/4 flex flex-col items-center justify-center container">
      <h1 className="text-2xl font-semibold mb-8">Create a Task</h1>
      <div className="dates w-3/5 h-1/2 bg-base-300 rounded-2xl box-content p-10 flex flex-col justify-between">
        <div className="w-full h-full flex justify-right dates-Content">
          <form
            action=""
            className="w-full h-full flex flex-col justify-evenly items-center"
          >
            <input
              type="text"
              id="nameId"
              className="w-1/2 p-2 font-semibold bg-base-100 rounded-lg inputName"
              maxLength={32}
              placeholder="Name of the task"
              value={dateName}
              onChange={handleDateName}
            />
            <div className="w-full flex justify-center">
              <input
                type="number"
                max={23}
                maxLength={2}
                min={0}
                className="w-1/5 mr-16 font-semibold bg-base-100 text-center text-5xl rounded-lg hours"
                value={dateHours}
                onChange={handleDateHours}
              ></input>
              <span className="text-4xl absolute">:</span>
              <input
                type="number"
                max={59}
                maxLength={2}
                min={0}
                className="w-1/5 font-semibold bg-base-100 text-center text-5xl rounded-lg hours"
                value={dateMinutes}
                onChange={handleDateMinutes}
              ></input>
            </div>
          </form>
          <div className="flex flex-col justify-start items-center w-max h-max">
            <h1 className="text-xl font-sans">{props.year}</h1>
            <h1 className="text-3xl font-sans">{props.month}</h1>
            <h1 className="text-8xl font-sans">{props.day}</h1>
          </div>
        </div>

        <div className="w-full flex justify-around">
          <button
            className="save btn"
            onClick={() =>
              props.saveDate(
                props.index,
                dateName,
                dateHours,
                dateMinutes,
                props.day,
                props.month
              )
            }
          >
            Save
          </button>
          <button className="cancel btn" onClick={() => props.cancelDate()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
