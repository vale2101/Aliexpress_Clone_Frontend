interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, className = "" }) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full border rounded px-3 py-2 ${className}`}
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

export default Select;