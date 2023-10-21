document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const submitButton = e.target.querySelector('button[type="submit"]');
  const spinner = submitButton.querySelector(".spinner");
  const btnText = submitButton.querySelector(".btn-text"); 

  btnText.style.display = "none";
  spinner.style.display = "inline-block";
  submitButton.disabled = true;

  try {
    const response = await fetch("/register", {
      method: "POST",
      body: formData,
    });

    spinner.style.display = "none";
    btnText.style.display = "inline-block";
    submitButton.disabled = false;

    if (!response.ok) {
      const data = await response.json();
      alert(data.error);
      return;
    }

    window.location.href = "/login";
  } catch (error) {
    spinner.style.display = "none";
    btnText.style.display = "inline-block";
    submitButton.disabled = false;

    console.error("Fetch error:", error);
    alert("An error occurred. Please try again.");
  }
});
