document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("dateForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const startDate = document.querySelector('input[name="startDate"]').value;
    const endDate = document.querySelector('input[name="endDate"]').value;

    fetch("/graph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        renderChart(data);
      });
  });

  function renderChart(chartData) {
    if (!chartData.labels.length) {
      return;
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          legend: {
            position: "top",
          },
        },
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  const encodedData = document
    .getElementById("chartData")
    .getAttribute("data-value");
  const initialChartData = JSON.parse(unescape(encodedData));
  renderChart(initialChartData);
});
