import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import {
  Avatar,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";
import { FaStudiovinari } from "react-icons/fa";
import { demoteAdmin } from "@/firebase/utils";
import alert from "@/utils/alert";
import { useDispatch } from "react-redux";
import { randomizeUpdateToken } from "@/store/slices/app";

export default function AdminsTable({ data }) {
  const [pageSize, setPageSize] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const dispatch = useDispatch();

  const handleDemote = (data) => {
    setDialogOpen(true);
    setDialogData(data);
  };

  const demoteAdminHandler = (admin) => {
    try {
      demoteAdmin(admin.localId);
      alert.success("Admin demoted successfully");
      setDialogOpen(false);
      dispatch(randomizeUpdateToken());
    } catch (error) {
      console.log(error);
      alert.error(error.message);
    }
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
            <Tooltip arrow title="Demote to user">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md ml-2 w-12 h-8 flex items-center justify-center"
                onClick={() =>
                  handleDemote({
                    ...params.row,
                    title: "Demote admin",
                    message: "Demote this admin to user?",
                    action: () => demoteAdminHandler(params.row),
                  })
                }
              >
                <FaStudiovinari />
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
        height: 200 + 45 * (data.length > pageSize ? pageSize : data.length),
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={(val) => setPageSize(val)}
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
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 10,
        }}
      >
        <DialogTitle id="alert-dialog-title">{dialogData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogData.message}
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
            name/uid:{" "}
            <span className="font-semibold">
              {dialogData.displayName || dialogData.uid}
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={dialogData.action} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
