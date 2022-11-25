import { useEffect } from "react";
import PackageItem from "./PackageItem";
import { getSnap } from "@/utils";

export default function PackageList({ data }) {
  useEffect(() => {
    getSnap();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
      {data.map((item, index) => (
        <PackageItem data={item} key={index} />
      ))}
    </div>
  );
}
