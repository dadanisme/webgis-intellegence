import Greeting from "../../components/user-admin/dashboard/Greeting";
import SubscriptionStatus from "../../components/user-admin/dashboard/SubscriptionStatus";
import Chart from "../../components/user-admin/dashboard/Chart";
import Statistics from "../../components/user-admin/dashboard/Statistics";

export default function Dashboard() {
  return (
    <div className="p-6 grid gap-4">
      <Greeting />
      <SubscriptionStatus />
      <Statistics />
      <div className="w-full h-96">
        <Chart />
      </div>
    </div>
  );
}
