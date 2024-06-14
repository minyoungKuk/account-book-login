interface CustomInputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.ComponentType<CustomInputProps> = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-80 px-2 py-4 mt-2 mb-8"
    />
  </div>
);
export default CustomInput;
