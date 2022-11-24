import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { useState } from "react";

export default function AdminsTable({ data }) {
  const [pageSize, setPageSize] = useState(5);
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
    <div
      style={{
        height: 200 + 45 * (data.length > pageSize ? pageSize : data.length),
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={(val) => setPageSize(val)}
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
