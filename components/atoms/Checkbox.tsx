interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, className = "" }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    className={`mr-2 ${className}`}
  />
);

export default Checkbox;