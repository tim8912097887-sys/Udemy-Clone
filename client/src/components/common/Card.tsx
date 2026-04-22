// Types to allow standard HTML props (like onClick, id, etc.)
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

const Card = ({ children, className = "", ...props }: DivProps) => {
  return (
    <div
      className={`rounded-xl border bg-white text-slate-950 shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const Header = ({ children, className = "", ...props }: DivProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

const Title = ({ children, className = "", ...props }: HeadingProps) => {
  return (
    <h3
      className={`font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

const Description = ({
  children,
  className = "",
  ...props
}: ParagraphProps) => {
  return (
    <p className={`text-sm text-slate-500 ${className}`} {...props}>
      {children}
    </p>
  );
};

const Content = ({ children, className = "", ...props }: DivProps) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

const Footer = ({ children, className = "", ...props }: DivProps) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;
Card.Footer = Footer;

export default Card;
