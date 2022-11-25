import { useState } from "react";
import packageHeader from "@/assets/components/package-header.svg";
import logo from "@/assets/images/logo.svg";
import { formatter } from "@/utils";
import { Tooltip } from "@mui/material";
import { AiFillCheckCircle } from "react-icons/ai";
import Dialog from "@/components/core/Dialog";
import { alert } from "@/utils";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/user";

export default function PackageItem({ data }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { details, user } = useSelector(selectUser);

  const api = import.meta.env.VITE_API;

  const getSnapToken = async () => {
    try {
      const res = await fetch(`${api}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          uid: details.uid,
          name: user?.displayName || details?.displayName,
          email: details.email,
          phone: user?.phoneNumber || details?.phoneNumber || "",
          amount: data.price,
          order_id:
            "order-package-" +
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
          item_details: [
            {
              ...data,
              quantity: 1,
            },
          ],
        }),
      });

      const response = await res.json();

      if (response.success) {
        const { token } = response.data;
        return token;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err);
      alert.error("Something went wrong");
    }
  };

  const handlePay = async () => {
    const token = await getSnapToken();
    setDialogOpen(false);
    console.log(token);
    window.snap.pay(token, {
      onSuccess: function (result) {
        console.log(result);
        alert.success("Payment success");
      },
      onPending: function (result) {
        console.log(result);
        alert.info("Payment pending");
      },
      onError: function (result) {
        console.log(result);
        alert.error("Payment failed");
      },
      onClose: function () {
        console.log("customer closed the popup without finishing the payment");
      },
    });
  };

  return (
    <div className="shadow-lg relative min-h-[11rem]">
      <Tooltip title={data.description} placement="bottom" arrow>
        <header className="w-full">
          <figure className="select-none">
            <img
              src={packageHeader}
              alt="package-header"
              className="w-full top-0"
            />
          </figure>
          <div className="absolute top-0 z-[1] p-4 sm:p-8 md:p-6 lg:p-4">
            <img
              src={logo}
              alt="logo"
              className="w-20 xs:w-24 sm:w-24 md:w-24 lg:w-20 xl:w-24 z-[1] relative -left-1.5"
            />
            <h1 className="text-white font-semibold mt-2">{data.name}</h1>
            <h4 className="text-xs text-white">
              <span className="font-bold">{formatter.format(data.price)}</span>
              /thn
            </h4>
          </div>
        </header>
      </Tooltip>
      <div className="p-4 mb-[44px]">
        <ul className="list-none">
          {data.features?.map((feature, index) => (
            <Tooltip
              title={feature.description}
              key={index}
              arrow
              placement="left"
            >
              <li className="flex items-center gap-2 text-sm font-semibold">
                <AiFillCheckCircle className="text-green-700 text-lg" />
                {feature.name}
              </li>
            </Tooltip>
          ))}
        </ul>
        <Tooltip title={data.description} placement="top" arrow>
          <button
            className="bg-[#4461F2] hover:bg-blue-700 h-[40px] text-white font-semibold py-2 
          rounded-md shadow-lg w-[90%] absolute bottom-2 left-1/2 -translate-x-1/2"
            onClick={() => setDialogOpen(true)}
          >
            Subscribe
          </button>
        </Tooltip>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Subscribe"
        content={
          <div>
            <p>
              Subscribe to <span className="font-semibold">{data.name}</span>?
              You do the right thing!
            </p>
          </div>
        }
        confirmAction={() => handlePay()}
      />
    </div>
  );
}
