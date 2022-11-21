import { useEffect, useState } from "react";
import Statistics from "../../components/user-admin/dashboard/Statistics";
import UsersTable from "../../components/admin/users/UsersTable";
import Progress from "../../components/loading/Progress";

export default function Users() {
  const api = import.meta.env.VITE_API;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${api}/users`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <Statistics />

      <div className="shadow-lg p-6 mt-8">
        <h1 className="font-semibold text-2xl mb-4">Users Table</h1>
        {data.length > 0 ? (
          <UsersTable data={data} />
        ) : (
          <div className="h-96">
            <Progress />
          </div>
        )}
      </div>
    </div>
  );
}
