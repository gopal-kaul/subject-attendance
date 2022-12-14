import { useState, useEffect } from "react";

import { ref, getDatabase, get, child, set } from "firebase/database";
import { app } from "../lib/firebase";
export default function Admin() {
  const dbref = ref(getDatabase(app));
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
            total: admin[sub].total + 1,
            cancelled: admin[sub].cancelled + 1,
          };
          console.log(admin[sub]);
        }
      }
    }
    return admin;
  }
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    get(child(dbref, "data/"))
      .then((snapshot) => snapshot.val())
      .then((data) => setAdmin(present(data)))
      .catch((e) => console.error(e));
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
                {admin[e].total - admin[e].taken - admin[e].cancelled}
              </td>
              <td className="border py-1 px-2">{admin[e].cancelled}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
