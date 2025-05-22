document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const password = this.password.value;

    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.text())
    .then(data => {
        console.log("Server response:", data);
        if (data.toLowerCase().includes("success")) {
            window.location.href = "dashboard.html";
        } else {
            alert(data || "Signup failed.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Sign Up failed " + error.message);
    });
});