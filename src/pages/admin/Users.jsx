import { useEffect, useState } from "react";
import Statistics from "../../components/user-admin/dashboard/Statistics";
import UsersTable from "../../components/admin/users/UsersTable";
import AdminsTable from "../../components/admin/users/AdminsTable";
import Progress from "../../components/loading/Progress";
import { getAdmins } from "../../firebase/utils";
import { selectApp } from "../../store/slices/app";
import { useSelector } from "react-redux";
import Title from "@/layouts/Title";

export default function Users() {
  const { updateToken } = useSelector(selectApp);
  const api = import.meta.env.VITE_API;
  const [data, setData] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(`${api}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => console.log(err));

    (async () => {
      const admins = await getAdmins();
      setAdmins(admins);
    })();
  }, [updateToken]);

  return (
    <div className="p-6">
      <Title>Management Users - WebGIS Intellegence</Title>
      <Statistics />

      <div className="shadow-lg p-6 mt-8">
        <h1 className="font-semibold text-2xl mb-4">Users Table</h1>
        {data.length > 0 ? (
          <UsersTable
            data={data.filter(
              (user) => !admins.map((admin) => admin.uid).includes(user.localId)
            )}
          />
        ) : (
          <div className="h-96">
            <Progress />
          </div>
        )}
      </div>

      <div className="shadow-lg p-6 mt-8">
        <h1 className="font-semibold text-2xl mb-4">Admins Table</h1>
        {data.length > 0 ? (
          <AdminsTable data={admins} />
        ) : (
          <div className="h-96">
            <Progress />
          </div>
        )}
      </div>
    </div>
  );
}
