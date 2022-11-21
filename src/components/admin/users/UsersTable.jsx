import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

export default function UsersTable({ data }) {
  const handleEdit = (user) => {
    console.log(user);
  };

  const handleDelete = (uid) => {
    console.log("delete", uid);
  };

  const columns = [
    {
      field: "photoUrl",
      headerName: "Photo",
      width: 60,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => (
        <a
          href={`mailto:${params.value}`}
          className="text-blue-500 hover:underline"
        >
          {params.value}
        </a>
      ),
    },
    {
      field: "displayName",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        return params.value || "-";
      },
    },
    {
      field: "emailVerified",
      headerName: "Verified",
      width: 150,
      renderCell: (params) => {
        return params.value ? "Yes" : "No";
      },
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 250,
      renderCell: (params) => {
        return new Date(params.value * 1).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
              onClick={() => handleEdit(params.row)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
              onClick={() => handleDelete(params.row.localId)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="h-[40rem]">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row.localId}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
}
