# SkyLens - Weather App

SkyLens is a clean, responsive weather application built with **React**, **TypeScript**, and **CSS**, allowing users to search for weather conditions by city, view current weather details, a 3-day forecast, toggle temperature units (°C/°F), and switch between light/dark mode.

## Features

* **Search Weather by City:** Enter any city to fetch and display current weather.
* **Current Location Support:** Quickly get your local weather with one click.
* **Quick Location Buttons:** Instantly view weather for New York, London, and Tokyo.
* **Current Weather Details:** Includes temperature, description, humidity, wind speed, pressure, UV index, and visibility.
* **3-Day Forecast:** View upcoming weather trends.
* **Temperature Unit Toggle:** Switch between Celsius and Fahrenheit.
* **Dark Mode Toggle:** Seamlessly toggle between light and dark modes.
* **Responsive Design:** Fully mobile-friendly and accessible.

## Tech Stack

* **React** (frontend framework)
* **TypeScript** (type-safe development)
* **CSS** (for styling and responsive design)
* **HTML** (structure)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/skylens-weather-app.git
   cd skylens-weather-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

## Usage

* Type a city name in the search bar and press `Enter` or click `Search`.
* Click `Current` to fetch your current location's weather.
* Use the quick location buttons for instant weather checks.
* Toggle between `°C` and `°F` using the unit toggle button.
* Enable dark mode by clicking the moon/sun icon.

## Folder Structure

```
skylens-weather-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.tsx
│   ├── index.tsx
│   └── styles/
│       └── style.css
│
├── package.json
└── tsconfig.json
```

## Future Improvements

* Integrate with **OpenWeatherMap API** or **WeatherAPI** for real-time data.
* Add hourly forecast.
* User preferences persistence using localStorage.
* Animations for weather transitions.
* Accessibility enhancements.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the **MIT License**.

## Screenshots

| Light Mode                           | Dark Mode                          |
| ------------------------------------ | ---------------------------------- |
| ![Light Mode](screenshot(1).png) | ![Dark Mode](screenshot(2).png) |

---

> **SkyLens** – See your weather clearly, anywhere.

If you need a `LICENSE` or `.gitignore` prepared for this repository for clean GitHub setup, let me know.
