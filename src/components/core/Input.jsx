import clsx from "clsx";
export default function Input(...props) {
  return (
    <div>
      <input
        className={clsx(
          "rounded-md px-4 py-2 w-full",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "bg-[#EAF0F7]"
        )}
        {...props}
      />
    </div>
  );
}
