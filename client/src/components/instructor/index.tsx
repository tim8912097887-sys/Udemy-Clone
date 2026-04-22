import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

const InstructorDashboardPresenter = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default InstructorDashboardPresenter;
