import { TabContext } from "../contexts";

type Props = {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabProvider = ({ children, activeTab, setActiveTab }: Props) => {
  return (
    <TabContext value={{ activeTab, setActiveTab }}>{children}</TabContext>
  );
};

export default TabProvider;
