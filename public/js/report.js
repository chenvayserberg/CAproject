async function submitReport(event) {
  event.preventDefault();
  const food = document.getElementById("food").value;
  const sugarLevel = document.getElementById("sugarLevel").value;

  try {
    const response = await fetch("/addReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ food, sugarLevel }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.success);
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
