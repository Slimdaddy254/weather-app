const apiKey = "D73YE4YGUGSSF6JMUD356SWUD";
const apiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");


async function checkWeather(city){
    try {
        const response = await fetch(`${apiUrl}${city}?key=${apiKey}`);

        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        
        document.querySelector(".city").innerHTML = data.address;
        document.querySelector(".temp").innerHTML = `${Math.round(data.currentConditions.temp)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.currentConditions.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.currentConditions.windspeed} kph`;

        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

})

// Wait for DOM to load before running the script
// // document.addEventListener('DOMContentLoaded', () => {
//     checkWeather();
// });