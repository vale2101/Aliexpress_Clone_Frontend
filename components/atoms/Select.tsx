interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, className = "" }) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full border rounded px-3 py-2 ${className}`}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;