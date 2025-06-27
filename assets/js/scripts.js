// assets/js/scripts.js

AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true
});

// Countdown Timer
document.addEventListener("DOMContentLoaded", () => {
  const countdownEl = document.querySelector(".countdown-wrapper");
  const timerDisplay = document.querySelector("#service-timer");

  if (!countdownEl || !timerDisplay) return;

  const targetDay = parseInt(countdownEl.dataset.day);     // 1 = Monday
  const targetHour = parseInt(countdownEl.dataset.hour);   // 0 = 12am
  const targetMinute = parseInt(countdownEl.dataset.minute); // 0

  function getNextTargetTime(day, hour, minute) {
    const now = new Date();
    const target = new Date(now);
    target.setHours(hour, minute, 0, 0);

    // Set to the target day of the week
    const currentDay = now.getDay(); // 0 = Sunday
    let daysUntilTarget = (day - currentDay + 7) % 7;

    // If we're on the target day but already past the time, move to next week
    if (daysUntilTarget === 0 && target <= now) {
      daysUntilTarget = 7;
    }

    target.setDate(now.getDate() + daysUntilTarget);
    return target;
  }

  function updateCountdown() {
    const target = getNextTargetTime(targetDay, targetHour, targetMinute);
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) return;

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.querySelector(".days").textContent = String(days).padStart(2, "0");
    timerDisplay.querySelector(".hours").textContent = String(hours).padStart(2, "0");
    timerDisplay.querySelector(".minutes").textContent = String(minutes).padStart(2, "0");
    timerDisplay.querySelector(".seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
