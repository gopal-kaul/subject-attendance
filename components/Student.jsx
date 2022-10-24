import { ref, getDatabase, get, child, set } from "firebase/database";
import { useState, useEffect } from "react";

import { app } from "../lib/firebase";
import Subject from "../components/Subject";
export default function Student() {
  const dbref = ref(getDatabase(app));
  const timetable = {
    Monday: ["DAA"],
    Tuesday: ["COMP", "ALC"],
    Wednesday: ["BEE", "OS"],
    Thursday: ["OE", "IT", "DM"],
    Friday: ["DBMS", "S&S"],
  };
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [data, setData] = useState({});
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-GB").replaceAll("/", "-")
  );
  const [day, setDay] = useState(days[new Date().getDay()]);
  useEffect(() => {
    get(child(dbref, "data/"))
      .then((snapshot) => snapshot.val())
      .then((data) => data !== null && setData(data))
      .then(() => console.log("Got data" + data))
      .catch((e) => console.error(e));
  }, []);
  useEffect(() => {
    console.log(data);
    if (data !== {})
      set(child(dbref, "data/"), data)
        .then(() => console.log("Set Data"))
        .catch((e) => console.error(e));
  }, [data]);
  if (typeof window !== undefined)
    return (
      <main className="">
        <h1 className="text-4xl">Student View : </h1>
        <p>Selected Date : {date}</p>
        <p>Day : {day}</p>
        <p>Selected Day&apos;s subjects : {timetable[day].join(", ")}</p>
        <h3>
          Set Date :
          <input
            type={"date"}
            id="date"
            name="date"
            onChange={(e) => {
              if (e.target.valueAsDate !== null) {
                setDate(
                  e.target.valueAsDate
                    .toLocaleDateString("en-GB")
                    .replaceAll("/", "-")
                );
                setDay(days[e.target.valueAsDate.getDay()]);
              }
            }}
          />
        </h3>
        {timetable[day].map((e) => (
          <Subject key={e} name={e} data={data} setData={setData} date={date} />
        ))}
      </main>
    );
}
