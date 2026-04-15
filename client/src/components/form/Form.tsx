type Props = {
  children: React.ReactNode;
};

const Form = ({ children }: Props) => {
  return (
    <form className="w-70 md:w-100 px-8 py-16 rounded space-y-10 shadow-2xl bg-amber-50">
      {children}
    </form>
  );
};

const Head = ({ children }: Props) => {
  return <div className="text-2xl font-bold">{children}</div>;
};

const Content = ({ children }: Props) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

Form.Content = Content;
Form.Head = Head;

export default Form;
