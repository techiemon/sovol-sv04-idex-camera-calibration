# Camera XY Calibration Web App

This project is a browser-based tool for camera-assisted XY offset calibration, designed for use with a USB camera. It allows you to select a camera, view a live stream, and perform calibration steps with easy-to-use forms and controls.

This cheepo Digital Microscope Handheld 2.0 inch IPS Color Screen for kids is what I'm using to calibrate my SoVOL SV04 IDEX printer. It's focus aligns a .04mm nozzle in the bullseye and has a 2.0MP sensor and adjustable LED lighting. It's about $20 on Amazon.
 https://www.amazon.com/dp/B0F4K15YXS
---

## Features
- **Camera Selection:** Choose any connected camera from a dropdown menu. Your preferred camera is saved and used by default on your next visit.
- **Live Video Stream:** View the selected camera with zoom and exposure controls.
- **Calibration Workflow:** Step-by-step instructions and forms for entering and calculating XY offsets.
- **Responsive UI:** Modern, clean interface for desktop browsers.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later recommended)

### Installation
1. **Clone or download this repository.**
2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the App Locally
Start a local development server with:
```sh
npm start
```
This will serve the app at [http://localhost:3000](http://localhost:3000) (or another port if 3000 is in use).

Open your browser and navigate to the local address shown in the terminal.

---

## Usage
1. **Allow Camera Access:**
   - On first load, your browser will ask for permission to access the camera. Grant permission to see the list of available cameras.
2. **Select Camera:**
   - Use the "Choose Camera" dropdown to select your preferred camera. The choice is saved for future visits.
3. **Calibration:**
   - Follow the on-screen instructions to perform calibration. Enter X and Y positions as prompted.
   - Use the zoom and exposure controls as needed for better visibility.
4. **Save Offsets:**
   - Calculated offsets are displayed at the end. Enter these values into your printer or slicer as needed.

---

## Troubleshooting
- If you do not see your camera listed, make sure you have granted camera permissions and that no other application is using the camera.
- If camera labels appear as "Camera 1", "Camera 2", etc., reload the page after granting permission.
- For more help, see the user manual link provided in the app or contact support.

---

## Project Structure
```
emberprototypes.github.io-main/
├── images/
│   ├── index.js           # App logic (except camera selection/streaming)
│   ├── Black Logo.png     # Logo image
│   └── Crosshair.png      # Crosshair overlay
├── index.html             # Main HTML file (UI, camera logic)
├── package.json           # Project metadata and scripts
├── README.md              # This file
└── ...                    # Other assets
```

---
