/**
 * Sky-Planner - Weather-based Event Planning Application
 * Allows users to create, view, edit, and delete events with weather data integration
 */

// Global state variables
let events = []; // Stores all events
let currentEventId = null; // Currently displayed event
let weatherApiKey = "05e7bdd29b152cef4f05d427a6e4a4f0"; // WeatherStack API key
