import { useState, useEffect } from "react";
export default function Admin({ data }) {
  function present(data) {
    const admin = {};
    for (let date in data) {
      for (let sub in data[date]) {
        console.log(`Subject ${sub}:,Val :  ${data[date][sub]}`);
        if (admin[sub] === undefined) {
          admin[sub] = {
            taken: 0,
            total: 0,
            cancelled: 0,
          };
        }
        if (data[date][sub] === 1) {
          console.log(`${sub} present`);
          admin[sub] = {
            taken: admin[sub].taken + 1,
            total: admin[sub].total + 1,
            cancelled: admin[sub].cancelled,
          };
          console.log(admin[sub]);
        } else if (data[date][sub] === 0) {
          console.log(`${sub} not taken`);

          admin[sub] = {
            cancelled: admin[sub].cancelled,
            taken: admin[sub].taken,
            total: admin[sub].total + 1,
          };
          console.log(admin[sub]);
        } else if (data[date][sub] === -1) {
          console.log(`${sub} cancelled`);
          admin[sub] = {
            taken: admin[sub].taken,
            total: admin[sub].total,
            cancelled: admin[sub].cancelled + 1,
          };
          console.log(admin[sub]);
        }
      }
    }
    console.log(admin);
    return admin;
  }
  const [admin, setAdmin] = useState({});
  console.log(data);
  useEffect(() => {
    setAdmin(present(data));
    console.log("Admin : ");
    console.log(admin);
  }, []);
  return (
    <div className="pt-10">
      <h1 className="text-4xl">Admin View : </h1>
      <table className="table-auto border">
        <thead>
          <tr>
            <td className="font-bold border py-1 px-2">Subject</td>
            <td className="font-bold border py-1 px-2">Total</td>
            <td className="font-bold border py-1 px-2">Taken</td>
            <td className="font-bold border py-1 px-2">Not taken</td>
            <td className="font-bold border py-1 px-2">Cancelled</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(admin).map((e) => (
            <tr key={e}>
              <td className="border py-1 px-2">{e}</td>
              <td className="border py-1 px-2">{admin[e].total}</td>
              <td className="border py-1 px-2">{admin[e].taken}</td>
              <td className="border py-1 px-2">
                {admin[e].total - admin[e].taken}
              </td>
              <td className="border py-1 px-2">{admin[e].cancelled}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
