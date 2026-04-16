type ButtonProps = {
  children: React.ReactNode;
  customClassName?: string;
  type: "button" | "submit" | "reset";
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const Button = ({ children, customClassName, type, props }: ButtonProps) => {
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
