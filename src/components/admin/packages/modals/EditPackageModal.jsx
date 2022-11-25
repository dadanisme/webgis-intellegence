import clsx from "clsx";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import { updatePackage, getFeatures } from "@/firebase/utils";
import Checkbox from "@/components/core/Checkbox";
import { formatter } from "@/utils/formatter";
import alert from "@/utils/alert";

export default function EditPackageModal({ data, onClose }) {
  const form = useRef(null);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getFeatures().then((res) => setFeatures(res));
  }, []);

  useEffect(() => {
    features.forEach((feature) => {
      if (data.features?.find((item) => item.id === feature.id)) {
        setSelectedFeatures((prev) => [...prev, feature]);
      }
    });
  }, [features]);

  useEffect(() => {
    if (!selectedFeatures) {
      setTotal(0);
      return;
    }
    const total = selectedFeatures.reduce(
      (total, num) => total + parseInt(num.price),
      0
    );
    setPrice(total);
  }, [selectedFeatures]);
  const handleChange = (e) => {
    const { id, checked } = e.target;

    setSelectedFeatures((prev) => {
      const isExist = prev?.find((item) => item.id === id);
      const feature = features?.find((item) => item.id === id);
      if (checked && !isExist) {
        return [...prev, feature];
      } else if (!checked && isExist) {
        return prev.filter((item) => item !== feature);
      } else if (!checked && !isExist) {
        return prev;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = form.current;

    const name = inputs[0].value;
    const description = inputs[1].value;

    const newData = {
      name,
      description,
      features: selectedFeatures,
      price,
    };

    try {
      updatePackage(data.id, newData);
      alert.success("Package updated!");
      onClose();
    } catch (err) {
      consoe.log(err);
      alert.error("Failed to update package");
    }
  };
  return (
    <div
      className="w-full md:w-3/5 md:h-96 bg-white fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 
      rounded-lg flex flex-col justify-center items-center"
    >
      <header className="w-full">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Edit Package</h2>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => onClose()}
          >
            <AiOutlineCloseCircle className="text-2xl" />
          </button>
        </div>
      </header>
      <hr className="w-full" />

      <main className="p-8 flex-1 w-full overflow-auto">
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
                defaultValue={data?.name}
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
                defaultValue={data?.description}
              />
            </div>

            <div>
              <label className="font-semibold text-gray-500">
                Features list
              </label>
              {features?.map((feature, index) => {
                const isChecked = selectedFeatures?.find(
                  (item) => item.id === feature.id
                )
                  ? true
                  : false;

                return (
                  <Checkbox
                    key={index}
                    id={feature.id}
                    name={feature.name}
                    description={feature.description}
                    onChange={handleChange}
                    checked={isChecked}
                  />
                );
              })}
            </div>

            <div>
              <h3 className="text-lg">
                Total price:{" "}
                <span className="font-semibold">{formatter.format(price)}</span>
              </h3>
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
