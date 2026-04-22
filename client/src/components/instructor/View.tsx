import { DollarSign, Users } from "lucide-react";
import Card from "../common/Card";
import Table from "../common/Table";

const DashboardView = () => {
  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: 3,
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: 2000,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {config.map((item) => (
          <Card key={item.label}>
            <Card.Header className="flex flex-row justify-center items-center space-y-0 pb-2">
              <Card.Title className="text-sm font-medium">
                {item.label}
              </Card.Title>
              <item.icon className="h-4 w-4 text-slate-500" />
            </Card.Header>
            <Card.Content>
              <div className="text-2xl font-bold">{item.value}</div>
            </Card.Content>
          </Card>
        ))}
      </div>
      <Card>
        <Card.Header>
          <Card.Title>Students List</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <Table.Header>
              <Table.Row>
                <Table.Head>Course Name</Table.Head>
                <Table.Head>Student Name</Table.Head>
                <Table.Head>Student Email</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body></Table.Body>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default DashboardView;
