import React from "react";
import getOrder from "../../../assets/images/get-order.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/user";

export default function SubscriptionStatus() {
  const { subscription_status } = useSelector(selectUser);
  if (subscription_status) return null;
  return (
    <div className="bg-primary flex items-center justify-between gap-4 p-4 pl-8 rounded-lg shadow-lg mt-4">
      <div className="text-white">
        <h1 className="text-3xl mb-4">
          <span className="font-bold">
            You have not subscribed to any plan yet!
          </span>
        </h1>
        <p className="text-sm">
          Subscribe to a plan to get access to all the features. There are no
          hidden charges. Lots of features here for you. We are sure you will
          love it.
        </p>
      </div>
      <img src={getOrder} alt="Get Order" className="hidden lg:block" />
    </div>
  );
}
