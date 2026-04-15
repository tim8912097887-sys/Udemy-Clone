type TabListProps = {
  children: React.ReactNode;
};

type TabProps = {
  name: string;
  currentActive: string;
  onClick: (tabName: string) => void;
};

const TabList = ({ children }: TabListProps) => {
  return (
    /* The Container: Gray background, rounded, centered items */
    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500">
      {children}
    </div>
  );
};

const Tab = ({ name, currentActive, onClick }: TabProps) => {
  const isActive = currentActive === name;

  return (
    <button
      onClick={() => onClick(name)}
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        ${
          isActive
            ? "bg-white text-gray-950 shadow-sm" // The "Active" pill look
            : "hover:text-gray-700" // The "Inactive" hover look
        }
      `}
    >
      {name}
    </button>
  );
};

TabList.Tab = Tab;

export default TabList;
