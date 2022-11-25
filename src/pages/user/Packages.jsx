import React from "react";
import Title from "@/layouts/Title";
import { useRealTimePackages } from "@/hooks";
import PackageList from "../../components/user/packages/PackageList";

export default function Packages() {
  const packages = useRealTimePackages();
  const data = Object.keys(packages).map((key) => packages[key]);

  return (
    <div className="p-6">
      <Title>Packages - WebGIS Intellegence</Title>
      <div>
        <PackageList data={data} />
      </div>
    </div>
  );
}
