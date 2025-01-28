import React from "react";
import { IconEdit, icons, IconTrash } from "@tabler/icons-react";

export default function Tasks(props) {

  const currentYear = new Date().getFullYear().toString()
  let year;
  if(props.year !== currentYear){
    year = props.year 
  }else if(props.year === currentYear){
    year = null
  } 
  return (
    <div className="task">
      <span className="font-semibold">{props.day} De {props.month}</span>
      <div className="flex px-4 py-2 justify-between rounded-lg my-2 bg-base-200">
        <span className="font-semibold">{props.name}</span>
        <div>
          <span className="font-semibold">{props.hours}</span>
          <span className="font-semibold">:</span>
          <span className="font-semibold">{props.minutes}</span>
        </div>
        <div>
          <button onClick={() => props.editTask(props.index, props.day, props.month, props.name, props.hours, props.minutes)}><IconEdit/></button>
          <button onClick={() => props.deleteTask()}><IconTrash/></button>
        </div>
      </div>
    </div>
  );
}
