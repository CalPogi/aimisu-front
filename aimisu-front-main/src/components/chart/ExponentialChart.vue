<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
      <div class="w-full">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Exponential Smoothing Forecast (α = 0.4)
        </h3>
        <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
          Historical and Forecasted Attendance by Category (2021–2025)
        </p>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div
        id="exponential-smoothing-chart"
        class="-ml-4 min-w-[800px] xl:min-w-full pl-2"
      >
        <VueApexCharts
          type="line"
          height="310"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

/* ------------------------------
  1. Years (2021–2025)
--------------------------------*/
const years = ['2021','2022','2023','2024','2025'];

/* ------------------------------
  2. Actual Data per Category
--------------------------------*/
const academic = [90, 110, 130, 155, 180];
const social = [70, 80, 92, 100, 112];
const cultural = [50, 55, 60, 66, 72];
const sports = [40, 52, 63, 70, 76];

/* ------------------------------
  3. Exponential Smoothing Function
  Formula: Ft = (α × A_(t-1)) + ((1 - α) × F_(t-1))
  Initial forecast F1 = A1
--------------------------------*/
function exponentialSmoothing(data: number[], alpha: number = 0.4): number[] {
  const forecasts: number[] = [];
  forecasts.push(data[0]); // F1 = A1

  for (let i = 1; i < data.length; i++) {
    const forecast: number = alpha * data[i - 1] + (1 - alpha) * forecasts[i - 1];
    forecasts.push(Number(forecast.toFixed(2)));
  }

  return forecasts;
}

/* ------------------------------
  4. Apply Smoothing per Category
--------------------------------*/
const academicForecast = exponentialSmoothing(academic);
const socialForecast = exponentialSmoothing(social);
const culturalForecast = exponentialSmoothing(cultural);
const sportsForecast = exponentialSmoothing(sports);

/* ------------------------------
  5. Chart Series
--------------------------------*/
const colors = ["#465FFF", "#22d3ee", "#f59e42", "#a3e635"];
const series = [
  { name: "Academic (Actual)", data: academic },
  { name: "Academic (Forecasted α=0.4)", data: academicForecast },
  { name: "Social (Actual)", data: social },
  { name: "Social (Forecasted α=0.4)", data: socialForecast },
  { name: "Cultural (Actual)", data: cultural },
  { name: "Cultural (Forecasted α=0.4)", data: culturalForecast },
  { name: "Sports (Actual)", data: sports },
  { name: "Sports (Forecasted α=0.4)", data: sportsForecast },
];

/* ------------------------------
  6. Chart Options
--------------------------------*/
const chartOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "center",
    fontSize: "13px",
  },
  colors: [
    colors[0], colors[0],
    colors[1], colors[1],
    colors[2], colors[2],
    colors[3], colors[3],
  ],
  chart: {
    fontFamily: "Outfit, sans-serif",
    type: "line",
    toolbar: { show: false },
  },
  fill: { type: "solid", opacity: 0.25 },
  stroke: {
    curve: "smooth",
    width: [2, 2, 2, 2, 2, 2, 2, 2],
    dashArray: [0, 6, 0, 6, 0, 6, 0, 6], // dashed for forecasts
  },
  markers: { size: 3 },
  xaxis: {
    categories: years,
    labels: {
      rotate: 0,
      style: { fontSize: "11px" },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    title: { text: "Attendance" },
    labels: { formatter: (val: number) => Math.round(val).toString() },
  },
  tooltip: {
    y: { formatter: (val: number) => (val ? val.toFixed(2) : "-") },
  },
};
</script>
