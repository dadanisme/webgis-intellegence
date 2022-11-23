import PackagesTable from "@/components/admin/packages/PackagesTable";
import FeaturesTable from "@/components/admin/packages/FeaturesTable";
import Progress from "@/components/loading/Progress";
import RequestsTable from "@/components/admin/packages/RequestsTable";
import { Tooltip, Modal } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { useState, lazy, Suspense } from "react";

const AddFeatureModal = lazy(() =>
  import("@/components/admin/packages/modals/AddFeatureModal")
);

const AddPackageModal = lazy(() =>
  import("@/components/admin/packages/modals/AddPackageModal")
);

export default function Packages() {
  const [addFeatureModalOpen, setAddFeatureModalOpen] = useState(false);
  const [addPackageModalOpen, setAddPackageModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="shadow-lg p-6">
        <header className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-2xl">Packages Table</h1>
          <Tooltip arrow title="Add Package">
            <button
              className="bg-blue-500 text-white p-2 rounded-md shadow-lg"
              onClick={() => setAddPackageModalOpen(true)}
            >
              <FaPlus />
            </button>
          </Tooltip>
        </header>
        <Modal
          open={addPackageModalOpen}
          onClose={() => setAddPackageModalOpen(false)}
          sx={{
            zIndex: 10,
          }}
        >
          <Suspense fallback={<Progress />}>
            <AddPackageModal onClose={() => setAddPackageModalOpen(false)} />
          </Suspense>
        </Modal>
        {true ? (
          <PackagesTable />
        ) : (
          <div className="h-96">
            <Progress />
          </div>
        )}
      </div>
      <div className="shadow-lg p-6 mt-8">
        <header className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-2xl">Features Table</h1>
          <Tooltip arrow title="Add Feature">
            <button
              className="bg-blue-500 text-white p-2 rounded-md shadow-lg"
              onClick={() => setAddFeatureModalOpen(true)}
            >
              <FaPlus />
            </button>
          </Tooltip>
        </header>
        <Modal
          open={addFeatureModalOpen}
          onClose={() => setAddFeatureModalOpen(false)}
          sx={{
            zIndex: 10,
          }}
        >
          <Suspense fallback={<Progress />}>
            <AddFeatureModal onClose={() => setAddFeatureModalOpen(false)} />
          </Suspense>
        </Modal>
        {true ? (
          <FeaturesTable />
        ) : (
          <div className="h-96">
            <Progress />
          </div>
        )}
      </div>
      <div className="shadow-lg p-6 mt-8">
        <h1 className="font-semibold text-2xl mb-4">Custom Package Requests</h1>
        {true ? (
          <RequestsTable />
        ) : (
          <div className="h-96">
            <Progress />
          </div>
        )}
      </div>
    </div>
  );
}
