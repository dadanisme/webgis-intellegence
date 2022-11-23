import clsx from "clsx";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRef } from "react";
import { createFeature } from "@/firebase/packages";
import alert from "@/utils/alert";

export default function AddFeatureModal({ onClose }) {
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = form.current;

    const name = inputs[0].value;
    const description = inputs[1].value;
    const price = inputs[2].value;

    try {
      createFeature({
        name,
        description,
        price,
      });

      alert.success("Feature created successfully");
      onClose();
    } catch (err) {
      console.log(err);
      alert.error("Error creating feature");
    }
  };
  return (
    <div
      className="w-full md:w-3/5 md:h-96 bg-white fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 
      rounded-lg flex flex-col justify-center items-center"
    >
      <header className="w-full">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Add Feature</h2>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => onClose()}
          >
            <AiOutlineCloseCircle className="text-2xl" />
          </button>
        </div>
      </header>
      <hr className="w-full" />

      <main className="p-8 flex-1 w-full">
        <div className="flex gap-8 w-full items-center justify-center flex-col md:flex-row">
          <form
            className="flex flex-col gap-2 flex-1 relative -top-2"
            ref={form}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="font-semibold text-gray-500">
                Feature Name
              </label>
              <input
                className={clsx(
                  "rounded-md px-4 py-2 w-full h-[40px]",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "bg-[#EAF0F7]"
                )}
                type="text"
                name="name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="font-semibold text-gray-500"
              >
                Description
              </label>
              <input
                className={clsx(
                  "rounded-md px-4 py-2 w-full h-[40px]",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "bg-[#EAF0F7]"
                )}
                type="text"
                name="description"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="font-semibold text-gray-500">
                Price
              </label>
              <input
                className={clsx(
                  "rounded-md px-4 py-2 w-full h-[40px]",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "bg-[#EAF0F7]"
                )}
                type="number"
                name="price"
                required
              />
            </div>
            <button
              className="bg-[#4461F2] hover:bg-blue-700 h-[40px] text-white font-semibold py-2 mt-2 rounded-md shadow-lg"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
