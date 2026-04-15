import type { PropsWithChildren } from "react";

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      {children}
    </header>
  );
};

export default Header;
