import { ChartOptions } from "chart.js"

export const Config: ChartOptions<"line"> = {
  animation: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  parsing: false,
  maintainAspectRatio: false,
  responsive: true,

  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
  scales: {
    x: {
      type: "time",
      ticks: {
        source: "auto",
        autoSkip: true,
        maxRotation: 0,
        color: "#d8dce3",
      },
    },
    y: { display: true, beginAtZero: true, ticks: { color: "#d8dce3" } },
  },
}
