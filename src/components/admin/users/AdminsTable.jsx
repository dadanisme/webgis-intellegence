import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

export default function AdminsTable({ data }) {
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
          sx={{ width: 40, height: 40 }}
          alt="user photo"
        />
      ),
    },
    {
      field: "uid",
      headerName: "UID",
      width: 120,
    },
    {
      field: "displayName",
      headerName: "Name",
      width: 200,
    },
    {
      field: "company",
      headerName: "Company",
      width: 150,
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
              onClick={() => handleDelete(params.row.uid)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="h-96">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row.uid}
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
