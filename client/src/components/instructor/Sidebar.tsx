import { menuItems } from "../../configs";
import Button from "../common/Button";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Sidebar = ({ activeTab, setActiveTab }: Props) => {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Instructor Dashboard</h2>
        <nav className="">
          {menuItems.map((item) => (
            <Button
              key={item.value}
              type="button"
              customClassName={`${activeTab === item.value ? "bg-gray-200" : ""} w-full justify-start flex items-center mb-2`}
              onClick={() => setActiveTab(item.value)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
