import Checkbox from "../atoms/Checkbox";

interface Props {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CheckboxField: React.FC<Props> = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
    <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />
    {label}
  </label>
);

export default CheckboxField;