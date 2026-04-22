import useTab from "../../hooks/useTab";
import TabProvider from "../../providers/TabProvider";
import Button from "./Button";

type TabProps = {
  children: React.ReactNode;
  className?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
};

type ListProps = React.HTMLAttributes<HTMLDivElement>;

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  value: string;
};

const Tab = ({
  children,
  className = "",
  activeTab,
  setActiveTab,
}: TabProps) => {
  return (
    <TabProvider activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className={className}>{children}</div>
    </TabProvider>
  );
};

const List = ({ children, className = "", ...props }: ListProps) => {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 text-gray-500 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const Trigger = ({
  children,
  value,
  className = "",
  ...props
}: ButtonProps) => {
  const { activeTab, setActiveTab } = useTab();
  const isActive = activeTab === value;
  const customClassName = `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 
        ${isActive ? "bg-white text-slate-950 shadow-sm" : "hover:text-slate-700"} 
        ${className}`;
  return (
    <Button
      value={value}
      type="button"
      customClassName={customClassName}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </Button>
  );
};

const Content = ({
  children,
  value,
  className = "",
  ...props
}: ContentProps) => {
  const { activeTab } = useTab();

  if (activeTab !== value) return null;

  return (
    <div
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Tab.List = List;
Tab.Trigger = Trigger;
Tab.Content = Content;

export default Tab;
