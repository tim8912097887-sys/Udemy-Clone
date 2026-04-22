import { menuItems } from "../../configs";
import Tab from "../common/Tab";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Dashboard = ({ activeTab, setActiveTab }: Props) => {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <Tab activeTab={activeTab} setActiveTab={setActiveTab}>
          {menuItems.map((item) => (
            <Tab.Content key={item.value} value={item.value}>
              {item.component && <item.component />}
            </Tab.Content>
          ))}
        </Tab>
      </div>
    </main>
  );
};

export default Dashboard;
