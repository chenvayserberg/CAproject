async function login(event) {
  event.preventDefault();
  const userID = document.getElementById("userID").value;
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID }),
    });

    if (response.ok) {
      console.log("Login successful");
      window.location.href = "/";
    } else {
      const responseBody = await response.json();
      console.error("Login failed:", responseBody.error);
      alert(responseBody.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
