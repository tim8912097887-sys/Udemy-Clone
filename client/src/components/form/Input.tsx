type Props = {
  placeholder: string;
  name: string;
  type: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({
  placeholder,
  name,
  type,
  value,
  onChange,
  className,
}: Props) => {
  return (
    <input
      className={`
        flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors 
        file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 
        placeholder:text-gray-500 
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
