import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Avatar,
  Modal,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";
import { useState, lazy, Suspense } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Progress from "../../../components/loading/Progress";
import alert from "../../../utils/alert";
import { useDispatch } from "react-redux";
import { randomizeUpdateToken } from "../../../store/slices/app";
import { promoteUser } from "../../../firebase/utils";
import { FaMeteor } from "react-icons/fa";

const UsersModal = lazy(() => import("./UsersModal"));

export default function UsersTable({ data }) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [pageSize, setPageSize] = useState(10);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});

  const handleEdit = (user) => {
    setModalData(user);
    setModalOpen(true);
  };

  const handleDelete = (data) => {
    setDialogOpen(true);
    setDialogData(data);
  };

  const handlePromote = (data) => {
    setDialogOpen(true);
    setDialogData(data);
  };

  const promoteUserHandler = (user) => {
    try {
      promoteUser(user.localId);
      dispatch(randomizeUpdateToken());
      alert.success("User promoted successfully");
      setDialogOpen(false);
    } catch (error) {
      console.log(error);
      alert.error(error.message);
    }
  };

  const deleteUser = (user) => {
    alert.info("Deleting user...");
    const api = import.meta.env.VITE_API;
    fetch(`${api}/user/${user.localId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDialogOpen(false);
          alert.success("Account deleted successfully");
          dispatch(randomizeUpdateToken());
        } else {
          console.log(data);
          alert.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert.error(err.message);
      });
  };

  const columns = [
    {
      field: "photoURL",
      headerName: "Photo",
      width: 60,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{ width: 40, height: 40 }}
          referrerPolicy="no-referrer"
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
      width: 200,
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
                onClick={() =>
                  handleDelete({
                    ...params.row,
                    title: "Delete User",
                    message: "Are you sure you want to delete this user?",
                    action: () => deleteUser(params.row),
                  })
                }
              >
                <FaTrash />
              </button>
            </Tooltip>

            <Tooltip arrow title="Promote as Admin">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md ml-2 w-12 h-8 flex items-center justify-center"
                onClick={() =>
                  handlePromote({
                    ...params.row,
                    title: "Promote User",
                    message: "Promote this user to admin?",
                    action: () => promoteUserHandler(params.row),
                  })
                }
              >
                <FaMeteor />
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
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        timeout={500}
        closeAfterTransition
        sx={{
          zIndex: 10,
        }}
      >
        <Suspense fallback={<Progress />}>
          <UsersModal data={modalData} onClose={() => setModalOpen(false)} />
        </Suspense>
      </Modal>
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
