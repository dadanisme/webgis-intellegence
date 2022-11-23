import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Tooltip, Modal } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRealTimeFeatures } from "@/hooks";
import { useState, lazy, Suspense } from "react";
import Progress from "@/components/loading/Progress";

const EditFeatureModal = lazy(() => import("./modals/EditFeatureModal"));

export default function FeaturesTable() {
  const features = useRealTimeFeatures();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});

  const data = Object.keys(features).map((key) => {
    return {
      id: key,
      name: features[key].name,
      description: features[key].description,
      price: features[key].price,
      active: features[key].active,
    };
  });

  const handleEdit = (feature) => {
    setEditModalOpen(true);
    setEditModalData(feature);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Feature",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
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
                // onClick={() => handleDelete(params.row.localId)}
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
      />

      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        timeout={500}
        closeAfterTransition
        sx={{
          zIndex: 10,
        }}
      >
        <Suspense fallback={<Progress />}>
          <EditFeatureModal
            data={editModalData}
            onClose={() => setEditModalOpen(false)}
          />
        </Suspense>
      </Modal>
    </div>
  );
}
