import Greeting from "../../components/user/dashboard/Greeting";
import SubscriptionStatus from "../../components/user/dashboard/SubscriptionStatus";
import Chart from "../../components/user/dashboard/Chart";
import Statistics from "../../components/user/dashboard/Statistics";

export default function Dashboard() {
  return (
    <div className="p-6">
      <Greeting />
      <SubscriptionStatus />
      <Statistics />
      <div className="w-full h-96 mt-4">
        <Chart />
      </div>
    </div>
  );
}
