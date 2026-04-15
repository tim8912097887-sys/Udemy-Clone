import type { PropsWithChildren } from "react";

type Props = {
  name: string;
} & PropsWithChildren;
const InputGroup = ({ name, children }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>{name}:</label>
      {children}
    </div>
  );
};

export default InputGroup;
