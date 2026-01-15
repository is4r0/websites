// api key and url
const apiKey = "3d5548ee42b2bd21b543e50abe4e68a5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// weather function
async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        // if city not found
        if (!response.ok) {
            // show error message
            document.querySelector(".error").style.display = "block";
            // hide weather
            document.querySelector(".weather").style.display = "none";
            return;
        }

        // if city is found
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Get weather condition from API response
        const weatherCondition = data.weather[0].main.toLowerCase();
        console.log("Weather condition:", weatherCondition); // Debugging

        // Define weather images
        const weatherImages = {
            clear: "images/clear.png",
            clouds: "images/clouds.png",
            rain: "images/rain.png",
            drizzle: "images/drizzle.png",
            thunderstorm: "images/thunderstorm.png",
            snow: "images/snow.png",
            mist: "images/mist.png",
            haze: "images/haze.png",
            dust: "images/dust.png",
            fog: "images/fog.png"
        };

        // Check if the condition exists in our object, otherwise use default
        if (weatherImages[weatherCondition]) {
            weatherIcon.src = weatherImages[weatherCondition] + "?v=" + Date.now(); // Cache-buster
        } else {
            weatherIcon.src = "images/clear.png"; // Fallback image
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});