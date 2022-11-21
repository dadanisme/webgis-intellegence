import React from "react";
import { MdOutlineLocationOn, MdOutlineGroup } from "react-icons/md";
import { FiLayers } from "react-icons/fi";
import clsx from "clsx";
export default function Statistics() {
  return (
    <div className="w-full grid lg:grid-cols-3 gap-2">
      <StatisticsItem
        icon={<MdOutlineLocationOn />}
        text="POI"
        amount={1002}
        growth={51}
        percentage={51}
      />
      <StatisticsItem
        icon={<MdOutlineGroup />}
        text="Users"
        amount={1002}
        growth={51}
        percentage={51}
      />
      <StatisticsItem
        icon={<FiLayers />}
        text="SHP"
        amount={1002}
        growth={51}
        percentage={51}
      />
    </div>
  );
}

function StatisticsItem({ icon, text, amount, growth, percentage }) {
  return (
    <div className="p-4 rounded-lg bg-white shadow-lg">
      <div className="flex items-center gap-4">
        <div className="text-2xl text-primary rounded-lg">{icon}</div>
        <h1 className="text-lg font-bold">All {text}</h1>
      </div>

      <div className="flex items-end gap-2">
        <h1 className="text-3xl font-semibold">{amount}</h1>
        <h4 className="text-lg">{text}</h4>
      </div>

      <div className="flex items-center gap-2">
        <h4 className="text-sm font-semibold text-gray-600 flex-1">
          Growth Monthly
        </h4>
        <h4 className="text-sm text-green-600">+{growth}</h4>
        <h4
          className={clsx(
            "text-sm text-white rounded-lg px-2 py-0.5",
            percentage > 0 ? "bg-green-600" : "bg-red-600"
          )}
        >
          {percentage}%
        </h4>
      </div>
    </div>
  );
}
