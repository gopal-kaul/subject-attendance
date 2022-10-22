export default function name({ name, data, setData, date }) {
  function todayTaken() {
    setData((old) => ({
      ...old,
      [date]: { ...old[date], [name]: 1 },
    }));
  }
  function notTaken() {
    setData((old) => ({
      ...old,
      [date]: { ...old[date], [name]: 0 },
    }));
  }
  function Cancelled() {
    setData((old) => ({
      ...old,
      [date]: { ...old[date], [name]: -1 },
    }));
  }
  return (
    <div className="border-2 p-4">
      <h2>Subject : {name}</h2>
      <div className="flex flex-row gap-4">
        <button
          className="bg-blue-500 py-2.5 px-4 text-white rounded-md"
          onClick={todayTaken}
        >
          Class Taken Today
        </button>
        <button
          className="bg-red-500 py-2.5 px-4 text-white rounded-md"
          onClick={notTaken}
        >
          Not Taken Today
        </button>
        <button
          className="bg-indigo-500 py-2.5 px-4 text-white rounded-md"
          onClick={Cancelled}
        >
          Cancelled
        </button>
        <h2>
          Today&apos;s status :{" "}
          {data[date]===undefined || data[date][name] === undefined
            ? "Not set"
            : data[date][name] === 1
            ? "Class Taken"
            : data[date][name] === 0
            ? "Class Not Taken"
            : data[date][name] === -1
            ? "Class Cancelled"
            : ""}
        </h2>
      </div>
    </div>
  );
}
