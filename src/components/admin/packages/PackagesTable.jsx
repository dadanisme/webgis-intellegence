import { useRealTimePackages } from "@/hooks";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatter } from "@/utils/formatter";
import { useState } from "react";

export default function PackagesTable() {
  const packages = useRealTimePackages();
  const [pageSize, setPageSize] = useState(10);

  const data = Object.keys(packages).map((key) => ({
    id: key,
    ...packages[key],
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Package", width: 130 },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "features",
      headerName: "Features",
      width: 200,
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
    {
      field: "price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => {
        return <span>{formatter.format(params.row.price)}</span>;
      },
    },
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
    <div
      style={{
        height: 200 + 75 * (data.length > pageSize ? pageSize : data.length),
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={(val) => setPageSize(val)}
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
