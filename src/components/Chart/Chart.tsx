import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function Chart({ dataArray }: { dataArray: any[] }) {
  const data = {
    labels: dataArray.map((x) => x.description),
    datasets: [
      {
        barPercentage: 0.5,
        label: "savings",
        data: dataArray.map((x) => x.totalSavings), //
        backgroundColor: "#b270c2",
        borderWidth: 1,
        grouped: true,
      },
      {
        barPercentage: 0.5,
        label: "expenses",
        data: dataArray.map((x) => x.totalExpenses),
        backgroundColor: "#e11d48",
        borderWidth: 1,
      },
      {
        barPercentage: 0.5,
        label: "income",
        data: dataArray.map((x) => x.totalIncome),
        backgroundColor: "#36d399",
        borderWidth: 1,
      },
    ],
  };

  const options = {};
  return (
    <div>
      <Bar data={data} options={options}></Bar>
    </div>
  );
}
