import { deleteFeature } from "@/firebase/packages";
import alert from "@/utils/alert";

export default function EditFeatureModal({ data, onClose }) {
  const handleDelete = () => {
    try {
      deleteFeature(data.id);
      alert.success("Feature deleted successfully");
      onClose();
    } catch (err) {
      console.log(err);
      alert.error("Error deleting feature");
    }
  };

  return (
    <div
      className="w-full h-full md:w-2/5 md:h-48 bg-white fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 
      rounded-lg flex flex-col justify-center items-center"
    >
      <main className="p-8 flex-1 w-full flex flex-col items-center justify-center">
        <h2 className="text-lg">
          Delete Feature <span className="font-semibold">{data.name}</span>?
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 h-[40px] text-white font-semibold w-20 py-2 mt-2 rounded-md shadow-lg"
          >
            Delete
          </button>
          <button
            onClick={() => onClose()}
            className="bg-[#4461F2] hover:bg-blue-700 h-[40px] text-white font-semibold w-20 py-2 mt-2 rounded-md shadow-lg"
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
