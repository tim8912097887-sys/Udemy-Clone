type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  customClassName?: string;
};

const Button = ({ children, customClassName, type, ...props }: ButtonProps) => {
  return (
    <button
      className={`font-bold rounded transition-colors duration-300 cursor-pointer ${customClassName || ""}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
