/**
 * Sky-Planner - Weather-based Event Planning Application
 * Allows users to create, view, edit, and delete events with weather data integration
 */

// Global state variables
let events = []; // Stores all events
let currentEventId = null; // Currently displayed event
let weatherApiKey = "05e7bdd29b152cef4f05d427a6e4a4f0"; // WeatherStack API key

/**
 * Converts UV index number to a descriptive category
 * @param {number} uvIndex - UV index value (1-11+)
 * @returns {string} - Description of UV risk level
 */
function getUVDescription(uvIndex) {
  if (uvIndex <= 2) return "Low";
  if (uvIndex <= 5) return "Moderate";
  if (uvIndex <= 7) return "High";
  if (uvIndex <= 10) return "Very High";
  return "Extreme";
}

/**
 * Gets Bootstrap color class based on risk level
 * @param {string} riskLevel - "low", "medium", or "high"
 * @returns {string} - CSS class name for appropriate badge color
 */
function getRiskBadgeClass(riskLevel) {
  const classMap = {
    low: "bg-success",
    medium: "bg-warning text-dark",
    high: "bg-danger",
  };
  return classMap[riskLevel] || "bg-secondary";
}

/**
 * Gets Bootstrap icon class based on risk level
 * @param {string} riskLevel - "low", "medium", or "high"
 * @returns {string} - Bootstrap icon class name
 */
function getRiskIcon(riskLevel) {
  const iconMap = {
    low: "bi-check-circle-fill",
    medium: "bi-exclamation-triangle-fill",
    high: "bi-x-circle-fill",
  };
  return iconMap[riskLevel] || "bi-info-circle-fill";
}

/**
 * Maps packing list item names to appropriate Bootstrap icons
 * @param {string} item - Name of packing list item
 * @returns {string} - Bootstrap icon name for the item
 */
function getItemIcon(item) {
  const iconMap = {
    Umbrella: "umbrella",
    "Light jacket": "coat-hanger",
    Sunscreen: "sun",
    "Water bottle": "droplet",
    "Picnic blanket": "grid-3x3",
    Hat: "person-badge",
    Sunglasses: "eyeglasses",
    "Waterproof jacket": "shield-check",
    "Warm jacket": "thermometer-low",
    Windbreaker: "wind",
    "Sports gear": "bag",
  };
  return iconMap[item] || "check-circle";
}

/**
 * Formats date and time values into a human-friendly string
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @returns {string} - Formatted date string (e.g., "Oct 21, 2025 at 4:00 PM")
 */
function formatDate(date, time) {
  const dateObj = new Date(date + "T" + time);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return dateObj.toLocaleDateString("en-US", options);
}

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
