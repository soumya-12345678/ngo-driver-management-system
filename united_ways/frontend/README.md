# Driver App

This repository contains the Driver App used by field drivers to submit earnings and for real-time movement tracking.

## Quick start (local)

Requirements: Node.js and npm installed.

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

Install optional mapping dependencies (if not installed automatically):

```sh
npm install react-leaflet leaflet
```

## Overview

Features added/maintained in this project:

- Driver earnings submission with offline support
- Real-time GPS tracking and trip distance computation (uses OpenStreetMap tiles)
- Lightweight React + Vite + Tailwind UI

## Notes

- The app persists last-submission and last-trip info to `localStorage` so offline drivers can submit data. The map uses the browser Geolocation API and requires the driver to allow location access.

