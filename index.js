// Camera and Calibration Utility for this cheepo Digital Microscope Handheld 2.0 inch IPS Color Screen for kids, it's focus aligns a .04mm nozzle int he bullseye
// https://www.amazon.com/dp/B0F4K15YXS
// This script provides camera connection, zoom, exposure, and calibration logic for the calibration web app.

/**
 * Attempts to find and connect to cameras from the list of available devices.
 * If found, streams the video to the #videoStream element.
 * Alerts the user if the camera is not found.
 */
// Camera selection and streaming logic is now handled in index.html
// Helper to get cameras if needed elsewhere
async function fetchCameraDevices() {
  await navigator.mediaDevices.getUserMedia({ video: true });
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(device => device.kind === 'videoinput');
}

async function connectToCamera() {
  if (navigator.mediaDevices.getUserMedia) {
    await navigator.mediaDevices.getUserMedia({ video: true });
    navigator.mediaDevices
      .enumerateDevices()
      .then(findCamera)
      .catch(function (error) {
        console.error("Error connecting to camera", error);
      });
  }
}

/**
 * Calculates offsets between the entered X and Y positions for calibration.
 * Updates the calibrationX and calibrationY fields with formatted results.
 */
function computeOffsets() {
  // Get X and Y values from input fields
  const x0 = document.getElementById("x0Field").value;
  const x1 = document.getElementById("x1Field").value;
  const y0 = document.getElementById("y0Field").value;
  const y1 = document.getElementById("y1Field").value;


  // Calculate differences and format to 2 decimal places
  let dx1 = (x0 - x1).toFixed(2);
  let dy1 = (y0 - y1).toFixed(2);

  // Only show separators if the values exist
  let sep1 = x1 !== "" ? " / " : "";

  if (x1 === "") { dx1 = ""; dy1 = ""; }

  // Build output strings
  const xResult = dx1 + sep1;
  const yResult = dy1 + sep1;

  document.getElementById("calibrationXVal").value = xResult;
  document.getElementById("calibrationYVal").value = yResult;
}

/**
 * Increases the zoom level of the video stream up to a maximum of 3x.
 */
function handleZoomIn() {
  if (currentZoomValue < 3) {
    currentZoomValue += 0.5;
    document.getElementById("videoFeed").style.transform = `scale(${currentZoomValue})`;
  }
}

/**
 * Decreases the zoom level of the video stream down to a minimum of 1x.
 */
function handleZoomOut() {
  if (currentZoomValue > 1) {
    currentZoomValue -= 0.5;
    document.getElementById("videoFeed").style.transform = `scale(${currentZoomValue})`;
  }
}

/**
 * Adjusts the brightness of the video stream based on the exposure slider.
 */
function handleExposure() {
  const exposure = document.getElementById("exposureSliderBar").value / 10;
  document.getElementById("videoFeed").style.filter = `brightness(${exposure})`;
}

/**
 * Ensures input values are formatted to two decimal places.
 * @param {HTMLInputElement} input
 */
function setDecimalPlaces(input) {
  input.value = parseFloat(input.value).toFixed(2);
}

/**
 * Handles the start button logic and UI state for calibration steps.
 */
function handleStart() {
  if (currentState === 0) {
    document.getElementById("backBtn").disabled = false;
    document.getElementById("resetBtn").disabled = false;
    document.getElementById("startBtn").innerHTML = "Continue";
  }
  currentState++;
  handleState();
}

/**
 * Handles the back button logic and UI state for calibration steps.
 */
function handleBack() {
  currentState--;
  handleState();
}

/**
 * Handles the reset button logic and UI state for calibration steps.
 */
function handleReset() {
  currentState = 0;
  handleState();
}

/**
 * Updates the UI and instructions for each step of the calibration process.
 */
function handleState() {
  switch (currentState) {
    case 0:
      document.getElementById("startBtn").innerHTML = "Start";
      document.getElementById("textBoxArea").innerHTML = "";
      document.getElementById("startBtn").disabled = false;
      document.getElementById("backBtn").disabled = true;
      document.getElementById("resetBtn").disabled = true;
      document.getElementById("x0Field").value = "";
      document.getElementById("x1Field").value = "";
      document.getElementById("y0Field").value = "";
      document.getElementById("y1Field").value = "";
      document.getElementById("calibrationXVal").value = "";
      document.getElementById("calibrationYVal").value = "";
      break;
    case 1:
      document.getElementById("textBoxArea").innerHTML =
        "You MUST clear existing machine offset values for calibration to be accurate.<br><br>" +
        "You MUST home the machine AFTER any changes to machine offset values.<br><br>" +
        "Order of operations is CRITICAL, follow instructions carefully.<br><br>" +
        "Ensure your bed camera is STABLE and does NOT MOVE during calibration.";
      break;
    case 2:
      document.getElementById("textBoxArea").innerHTML =
        "Clean nozzles - heat to 200C+ and wipe with brass/stainless brush.<br><br>" +
        "Backup current calibration values and then set to zero.";
      break;
    case 3:
      document.getElementById("textBoxArea").innerHTML =
        "Home the machine.<br><br>Move the Z axis up to 30mm.";
      break;
    case 4:
      document.getElementById("textBoxArea").innerHTML =
        "Place the bed camera on the bed and drive E0 until visible.<br><br>" +
        "Rotate the lens to focus the camera and adjust exposure if required.";
      break;
    case 5:
      document.getElementById("textBoxArea").innerHTML =
        "Move E0 until centered in the crosshair.<br><br>" +
        "Enter the absolute X and Y position into the fields below.";
      break;
    case 6:
      document.getElementById("textBoxArea").innerHTML =
        "Home E0 and move E1 to the position previously recorded.";
      break;
    case 7:
      document.getElementById("textBoxArea").innerHTML =
        "Move E1 until centered in the crosshair.<br><br>" +
        "Enter the absolute X and Y position into the fields below.<br><br>" +
        "Repeat for remaining extruders if any.";
      document.getElementById("startBtn").disabled = false;
      document.getElementById("calibrationXVal").value = "";
      document.getElementById("calibrationYVal").value = "";
      break;
    case 8:
      computeOffsets();
      document.getElementById("textBoxArea").innerHTML =
        "CALIBRATION COMPLETE!<br><br>" +
        "Enter the offset values into your printer or slicer.<br><br>" +
        "If you are having trouble calibrating, check our user manual for troubleshooting.";
      document.getElementById("startBtn").disabled = true;
      document.getElementById("backBtn").disabled = false;
      document.getElementById("resetBtn").disabled = false;
      break;
  }
}

