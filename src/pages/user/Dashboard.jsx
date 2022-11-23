import Greeting from "@/components/user-admin/dashboard/Greeting";
import SubscriptionStatus from "@/components/user-admin/dashboard/SubscriptionStatus";
import Chart from "@/components/user-admin/dashboard/Chart";
import Statistics from "@/components/user-admin/dashboard/Statistics";
import Title from "@/layouts/Title";

export default function Dashboard() {
  return (
    <div className="p-6 grid gap-4">
      <Title>User Dashboard - WebGIS Intellegence</Title>
      <Greeting />
      <SubscriptionStatus />
      <Statistics />
      <div className="w-full h-96 overflow-hidden">
        <Chart />
      </div>
    </div>
  );
}
