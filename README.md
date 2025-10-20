# ☀️ Sky-Planner

**Weather-Aware Event Planning Application**

Plan your outdoor events with confidence using real-time weather insights, intelligent risk assessment, and smart recommendations.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**Sky-Planner** is a modern, responsive web application designed to help users plan outdoor events intelligently by integrating real-time weather data. The application analyzes weather conditions and provides actionable insights including risk levels, optimal timing suggestions, and personalized packing lists.

### Why Sky-Planner?

- 🎯 **Smart Planning**: Make informed decisions about your outdoor events
- 🌤️ **Real-Time Data**: Access current weather conditions from WeatherStack API
- ⚠️ **Risk Assessment**: Automatic calculation of event risk based on multiple weather factors
- 📦 **Packing Lists**: Get weather-specific item recommendations
- ⏰ **Time Optimization**: Receive suggestions for the best times to hold your event
- 💾 **Persistent Storage**: All events are saved locally using JSON Server

---

## ✨ Features

### Core Functionality

#### 🎪 Event Management

- **Create Events**: Add outdoor events with name, location, date, and time
- **View Events**: Browse all upcoming events in an organized sidebar
- **Edit Events**: Update event details with automatic weather refresh
- **Delete Events**: Remove events with confirmation prompts
- **Persistent Storage**: Events saved to local JSON database

#### 🌦️ Weather Integration

- **Real-Time Weather**: Current conditions fetched from WeatherStack API
- **Temperature Monitoring**: Celsius temperature readings
- **Precipitation Tracking**: Percentage chance of rain
- **Wind Speed Analysis**: Wind conditions in km/h
- **UV Index**: Sun exposure risk levels with descriptions (Low to Extreme)
- **Weather Conditions**: Descriptive conditions (Partly Cloudy, Sunny, etc.)

#### ⚠️ Intelligent Risk Assessment

The application calculates risk levels based on multiple weather factors:

- **Low Risk** 🟢: Ideal conditions for outdoor events
- **Medium Risk** 🟡: Acceptable with precautions
- **High Risk** 🔴: Consider rescheduling or extra preparation

**Risk Factors Analyzed:**

- Temperature extremes (< 5°C or > 35°C)
- Precipitation probability (> 30%)
- Wind speed (> 15 km/h)
- Combined weather conditions

#### 🎯 Smart Recommendations

##### ⏰ Time Slot Suggestions

- Recommended times throughout the day
- Risk level for each time slot
- Based on weather patterns

##### 📦 Dynamic Packing Lists

Weather-specific items automatically recommended:

- ☔ **Umbrella** - High precipitation (>20%)
- 🧥 **Warm jacket** - Cold temperatures (<15°C)
- 🧢 **Hat** - Warm weather (>25°C)
- 🕶️ **Sunglasses** - High UV index (>5)
- 🧴 **Sunscreen** - High UV exposure
- 💧 **Water bottle** - Always recommended
- 🧥 **Windbreaker** - High winds (>15 km/h)
- And more...

### User Interface Features

#### 🎨 Modern Design

- **Responsive Layout**: Seamless experience on desktop, tablet, and mobile
- **Bootstrap 5.3.8**: Professional, accessible UI components
- **Custom Styling**: Perplexity-inspired design system
- **Color-Coded Risk**: Visual indicators for quick understanding
- **Bootstrap Icons**: 1,800+ icons for intuitive navigation
- **Smooth Animations**: Fade-in effects and transitions

#### 🔔 User Feedback

- **Toast Notifications**: Success and error messages
- **Loading States**: Visual feedback during API calls
- **Form Validation**: Real-time input validation
- **Confirmation Dialogs**: Safe deletion with user confirmation

---

## 💻 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **WeatherStack API Key** - [Get a free key](https://weatherstack.com/signup/free)
- **Modern Web Browser** - Chrome, Firefox, Safari, or Edge

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/njoroofficial/sky-planner.git
cd sky-planner
```

#### 2. Install Dependencies

Install json-server globally for the local database:

```bash
npm install -g json-server
```

Install project dependencies (Bootstrap Icons):

```bash
npm install
```

#### 3. Configure the Database

The `data/db.json` file should already exist. If not, create it:

```bash
mkdir -p data
```

Create/verify `data/db.json` with this content:

```json
{
  "events": []
}
```

#### 4. Configure Weather API Key

1. Sign up for a free WeatherStack account at [weatherstack.com](https://weatherstack.com/signup/free)
2. Copy your API access key
3. Open `index.js` and replace the API key on line 9:

```javascript
let weatherApiKey = "YOUR_WEATHERSTACK_API_KEY_HERE";
```

#### 5. Start the JSON Server

In a terminal window, start the database server:

```bash
json-server --watch data/db.json --port 3000
```

You should see:

```
Loading data/db.json
Done

Resources
http://localhost:3000/events

Home
http://localhost:3000
```

#### 6. Start the Application

Open a **new terminal window** and start a local web server:

**Use VS Code Live Server**

- Install the "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

#### 7. Open in Browser

Navigate to:

```
http://localhost:8000
```

---

## 📖 Usage Guide

### Creating Your First Event

1. **Fill in the Event Form** (left sidebar):

   - **Event Name**: e.g., "Picnic at Central Park"
   - **Location**: e.g., "Nairobi, Kenya"
   - **Date**: Select a future date (past dates are disabled)
   - **Time**: Choose your preferred time

2. **Click "Create Event"**

   - The application fetches real-time weather data
   - Risk level is automatically calculated
   - Packing list is generated
   - Time slots are recommended
   - Event appears in the "Upcoming Events" list

3. **View Success Notification**
   - A toast notification confirms event creation

### Viewing Event Details

1. **Click "View Details"** on any event in the sidebar
2. **Review the Weather Analysis**:
   - Current temperature and conditions
   - Precipitation probability
   - Wind speed
   - UV index with description
3. **Check the Risk Badge**:
   - Green (Low Risk): Ideal conditions
   - Yellow (Medium Risk): Proceed with caution
   - Red (High Risk): Consider rescheduling
4. **Explore Recommendations**:
   - **Recommended Times**: Best time slots for your event
   - **Packing Checklist**: Items to bring based on weather

### Editing an Event

1. **Open Event Details** (click "View Details")
2. **Click the "Edit Event" button** in the header
3. **Modify Information** in the modal dialog:
   - Update name, location, date, or time
   - All fields are pre-filled with current data
4. **Click "Save changes"**
   - Weather data is automatically refreshed
   - New recommendations are generated
   - Updates appear immediately

### Deleting an Event

1. **Open Event Details** (click "View Details")
2. **Click the "Delete Event" button** in the header
3. **Confirm Deletion** in the dialog box
4. **Event Removed**:
   - Deleted from database
   - Removed from sidebar
   - Welcome screen displays if no events remain

---

## 📁 Project Structure

```
sky-planner/
│
├── index.html              # Main application HTML
├── index.js                # Application logic
├── style.css               # Custom styles
├── package.json            # Project dependencies
├── README.md               # This file
│
├── data/
│   └── db.json            # JSON database for events
│
└── assets/
    └── bootstrap-icons/   # Bootstrap Icons library (1,800+ icons)
        ├── font/
        │   ├── bootstrap-icons.css
        │   ├── bootstrap-icons.min.css
        │   └── fonts/
        └── icons/
            └── ... (SVG icons)
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

**Project Maintainer:** njoroofficial

**Repository:** [github.com/njoroofficial/sky-planner](https://github.com/njoroofficial/sky-planner)

---
