// Define the timer parts here, remember to come in and set the timer default values

class timer {
  constructor(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
  }
}

// Bools to control the current timer
let isMainTimer = true;
let isRunning = false;
let isCurrentTimerSet = false;

// Set the default timers
let mainTimer = new timer(25, 0);
let breakTimer = new timer(5, 0);

// Create the current timer
let currentTimer = new timer(0, 0);

const beepSound = document.getElementById("beep");

// Update the default timer setting via the method below
displayTimers();
// Function: Add a zero before the timer if its less than zero

// Get connected to the onclick event

function handleClick(id) {
  if (mainTimer.minutes < 60 && id === "session-increment") {
    mainTimer.minutes++;
    console.log(mainTimer.minutes);
  } else if (mainTimer.minutes > 0 && id === "session-decrement") {
    mainTimer.minutes--;
    console.log(mainTimer.minutes);
  } else if (breakTimer.minutes < 60 && id === "break-increment") {
    breakTimer.minutes++;
    console.log(breakTimer.minutes);
  } else if (breakTimer.minutes > 0 && id === "break-decrement") {
    breakTimer.minutes--;
    console.log(breakTimer.minutes);
  }
  displayTimers();
}

// Consider storing a version of the original timer incase the user changes it

function handleStartStop() {
  if (isRunning) {
    // Stop timer
    isRunning = false;
    console.log("Timer Stopped");
  } else {
    isRunning = true;
    console.log("Timer Started");
  }
  if (!isCurrentTimerSet) {
    currentTimer = new timer(mainTimer.minutes, mainTimer.seconds);
    isCurrentTimerSet = true;
  }
  // Call the countdown function
  countdown();
}

const timerLabel = document.getElementById("timer-label");

function countdown() {
  if (isRunning) {
    if (isMainTimer) {
      timerLabel.textContent = "Session";
    } else if (!isMainTimer) {
      timerLabel.textContent = "Break";
    }
    if (currentTimer.seconds === 0 && currentTimer.minutes > 0) {
      // tick down one minutes
      currentTimer.minutes--;
      // Reset seconds to 60
      currentTimer.seconds = 59;
    } else if (currentTimer.seconds > 0) {
      currentTimer.seconds--;
    }
    // Either change to break timer or run alarm
    else if (
      currentTimer.seconds === 0 &&
      currentTimer.minutes === 0 &&
      isMainTimer
    ) {
      currentTimer = new timer(breakTimer.minutes, breakTimer.seconds);
      // Add the alarm sound here
      beepSound.play();
      isMainTimer = false;
    } else if (
      currentTimer.seconds === 0 &&
      currentTimer.minutes === 0 &&
      !isMainTimer
    ) {
      currentTimer = new timer(mainTimer.minutes, mainTimer.seconds);
      beepSound.play();
      isMainTimer = true;
    }
    setTimeout(countdown, 1000);
    console.log(currentTimer);
  }
  displayTimers();
}

function handleReset() {
  // Code to reset the timers
  isRunning = false;
  isCurrentTimerSet = false;
  isMainTimer = true;
  currentTimer = new timer(0, 0);
  mainTimer = new timer(25, 0);
  breakTimer = new timer(5, 0);
  displayTimers();
}

function displayTimers() {
  const timerLength = document.getElementById("session-length");
  timerLength.textContent = `${mainTimer.minutes}`;
  const breakLength = document.getElementById("break-length");
  // Update the below with the timer display via addZero
  breakLength.textContent = `${breakTimer.minutes}`;
  const currentLength = document.getElementById("time-left");
  if (currentTimer.minutes < 10 && currentTimer.seconds < 10) {
    currentLength.textContent = `0${currentTimer.minutes}:0${currentTimer.seconds}`;
  } else if (currentTimer.minutes < 10 && currentTimer.seconds > 10) {
    currentLength.textContent = `0${currentTimer.minutes}: ${currentTimer.seconds}`;
  } else if (currentTimer.minutes > 10 && currentTimer.seconds < 10) {
    currentLength.textContent = `${currentTimer.minutes}:0${currentTimer.seconds}`;
  } else {
    currentLength.textContent = `${currentTimer.minutes}:${currentTimer.seconds}`;
  }
}

window.handleClick = handleClick;
window.handleStartStop = handleStartStop;
window.handleReset = handleReset;
