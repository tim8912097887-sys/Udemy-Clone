import type { PropsWithChildren } from "react";

type Props = {
  name: string;
  label: string;
} & PropsWithChildren;
const InputGroup = ({ name, label, children }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>{label}:</label>
      {children}
    </div>
  );
};

export default InputGroup;
