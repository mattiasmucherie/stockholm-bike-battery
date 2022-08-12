import { ChartOptions } from "chart.js"

export const Config: ChartOptions<"line"> = {
  animation: {
    duration: 1,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  hover: {
    mode: "nearest",
    intersect: true,
  },
  scales: {
    x: {
      display: true,
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
        color: "#d8dce3",
      },
    },
    y: { display: true, beginAtZero: true, ticks: { color: "#d8dce3" } },
  },
}
