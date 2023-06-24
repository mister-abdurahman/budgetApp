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

export function Chart() {
  const data = {
    labels: ["Budget1", "Budget2", "Budget3"],
    datasets: [
      {
        barPercentage: 0.5,
        label: "savings",
        data: [2, 11, 9], //
        backgroundColor: "#b270c2",
        borderWidth: 1,
        grouped: true,
      },
      {
        barPercentage: 0.5,
        label: "expenses",
        data: [2, 6, 9],
        backgroundColor: "#e11d48",
        borderWidth: 1,
      },
      {
        barPercentage: 0.5,
        label: "income",
        data: [9, 6, 9],
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
