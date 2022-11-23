import { useRealTimePackages } from "@/hooks";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PackagesTable() {
  const packages = useRealTimePackages();

  const data = Object.keys(packages).map((key) => ({
    id: key,
    ...packages[key],
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Package", width: 130 },
    {
      field: "features",
      headerName: "Features",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="bg-">
            {params.row.features?.map((feature, index) => (
              <Tooltip
                title={feature.description}
                key={index}
                arrow
                placement="left"
              >
                <li className="list-disc bg-green-">{feature.name}</li>
              </Tooltip>
            ))}
          </div>
        );
      },
    },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex justify-center">
            <Tooltip arrow title="Edit">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md w-12 h-8 flex items-center justify-center"
                onClick={() => handleEdit(params.row)}
              >
                <FaEdit />
              </button>
            </Tooltip>

            <Tooltip arrow title="Delete">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 w-12 h-8 flex items-center justify-center"
                onClick={() => handleDelete(params.row)}
              >
                <FaTrash />
              </button>
            </Tooltip>
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
        getRowId={(row) => row.id}
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
        getRowHeight={(props) => {
          const features = props.model.features;
          const length = features?.length;

          if (!length || length < 3) {
            return 50;
          } else {
            return length * 25;
          }
        }}
      />
    </div>
  );
}
