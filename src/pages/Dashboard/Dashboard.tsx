import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

const Dashboard = () => {
  const mechanographyRecord = useSelector(
    (state: AppStore) => state.mechanography.max
  );
  return <div>{mechanographyRecord}Dashboard</div>;
};

export default Dashboard;
