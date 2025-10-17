/**
 * Sky-Planner - Weather-based Event Planning Application
 * Allows users to create, view, edit, and delete events with weather data integration
 */

// Global state variables
let events = []; // Stores all events
let currentEventId = null; // Currently displayed event
let weatherApiKey = "05e7bdd29b152cef4f05d427a6e4a4f0"; // WeatherStack API key

/**
 * Fetches weather data from WeatherStack API for a given location
 * @param {string} location - Location name (e.g., "Nairobi, Kenya")
 * @param {string} date - Event date (currently only used for logging)
 * @returns {Promise<Object>} - Formatted weather data object
 * @throws {Error} - If API request fails
 */
async function getWeatherData(location, date) {
  // We use try and catch to catch errors that may arise

  try {
    // Make API request
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${encodeURIComponent(
        location
      )}`
    );

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    // Handle API-specific errors
    if (data.error) {
      console.error("WeatherStack API error:", data.error);
      showErrorMessage(
        `Weather API error: ${data.error.info || "Unknown error"}`
      );
      throw new Error(data.error.info || "Unknown API error");
    }

    // Process successful response
    if (data.current) {
      // Normalize UV index to valid range (1-11)
      const uvIndex = Math.min(
        Math.max(Math.round(data.current.uv_index || 5), 1),
        11
      );

      // Format data for our application
      return {
        temperature: `${data.current.temperature}°C`,
        condition: data.current.weather_descriptions?.[0] || "Unknown",
        precipitation: `${data.current.precip || 0}%`,
        windSpeed: `${data.current.wind_speed || 0} km/h`,
        uvIndex: `${uvIndex} (${getUVDescription(uvIndex)})`,
      };
    } else {
      console.warn("Unexpected API response format:", data);
      throw new Error("Invalid response format from weather API");
    }
  } catch (err) {
    console.error("Weather API error:", err);
    showErrorMessage(
      "Failed to fetch weather data. Please check your API key and connection."
    );
    throw err;
  }
}
