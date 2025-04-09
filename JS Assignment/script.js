
document.addEventListener("DOMContentLoaded", function () {
    // BMI Calculator
    function calculateBMI() {
        let weight = document.getElementById("weight").value;
        let height = document.getElementById("height").value;
        if (weight > 0 && height > 0) {
            let bmi = (weight / (height * height)).toFixed(2);
            document.getElementById("bmiResult").innerText = `Your BMI: ${bmi}`;
        } else {
            alert("Please enter valid weight and height!");
        }
    }
    window.calculateBMI = calculateBMI;

    // Pop-up Boxes
    function showAlert() {
        alert("This is an alert message!");
    }
    function showConfirm() {
        let result = confirm("Are you sure you want to proceed?");
        alert(result ? "Confirmed!" : "Cancelled!");
    }
    function showPrompt() {
        let input = prompt("Enter your name:");
        if (input) {
            alert(`Hello, ${input}!`);
        }
    }
    window.showAlert = showAlert;
    window.showConfirm = showConfirm;
    window.showPrompt = showPrompt;

    // Event Handling & DOM Manipulation
    document.getElementById("changeTextButton").addEventListener("click", function () {
        document.getElementById("textToChange").innerText = "Text has been changed!";
    });

    // Form Validation
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        if (!emailPattern.test(email)) {
            document.getElementById("validationMessage").innerText = "Invalid email format";
        } else if (!passwordPattern.test(password)) {
            document.getElementById("validationMessage").innerText = "Password must be at least 8 characters, contain uppercase, lowercase, number, and special character.";
        } else {
            document.getElementById("validationMessage").innerText = "Registration successful!";
        }
    });

    // AJAX Request - Fetch Weather Data
    document.getElementById("fetchWeatherButton").addEventListener("click", function () {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric")
            .then(response => response.json())
            .then(data => {
                document.getElementById("weatherData").innerText = `Temperature in London: ${data.main.temp}°C`;
            })
            .catch(error => console.error("Error fetching weather data:", error));
    });
});
