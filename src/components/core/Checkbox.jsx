import { Tooltip, Checkbox as MUICheckbox } from "@mui/material";

export default function Checkbox({ id, name, description, onChange, checked }) {
  return (
    <div className="flex items-center gap-2">
      <MUICheckbox
        id={id}
        name={name}
        onChange={onChange}
        size="small"
        checked={checked}
        value={checked}
      />
      <Tooltip placement="right" arrow title={description}>
        <label htmlFor={id} className="text-md text-gray-600">
          {name}
        </label>
      </Tooltip>
    </div>
  );
}
