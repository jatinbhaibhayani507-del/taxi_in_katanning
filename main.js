const BOOKING_NUMBER = "+61483708627";

function setFooterYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function isIOS() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function buildMessage(formData) {
  const value = (field, fallback = "Not specified") =>
    (formData.get(field) || "").trim() || fallback;

  return [
    "Taxi booking enquiry",
    "",
    `Name: ${value("name")}`,
    `Phone: ${value("phone")}`,
    `Pickup: ${value("pickup")}`,
    `Destination: ${value("destination")}`,
    `Date: ${value("date")}`,
    `Pickup time: ${value("time")}`,
    `Passengers: ${value("passengers")}`,
    `Trip type: ${value("trip")}`,
    `Details: ${value("details", "None")}`,
  ].join("\n");
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const message = buildMessage(new FormData(event.currentTarget));
  const separator = isIOS() ? "&" : "?";

  window.location.href =
    `sms:${BOOKING_NUMBER}${separator}body=${encodeURIComponent(message)}`;
}

setFooterYear();

const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  bookingForm.addEventListener("submit", handleBookingSubmit);
}