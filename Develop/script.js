$(function () {
  // Display the current day at the top of the calendar using Day.js for formatting
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Dynamically generate time blocks for standard business hours (9AM-5PM)
  for (let hour = 9; hour <= 17; hour++) {
    // Constructing time block ID and display time (AM/PM format)
    const timeId = `hour-${hour}`;
    const displayHour = hour > 12 ? hour - 12 : hour; // Convert 24-hour to 12-hour format
    const amPm = hour >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    // Determine the class for the time block based on the current time
    const timeBlockClass = determineTimeBlockClass(hour);

    // HTML structure for each time block with dynamic classes and IDs
    const timeBlockHtml = `
      <div class="row time-block ${timeBlockClass}" id="${timeId}">
        <div class="col-md-1 hour">${displayHour}${amPm}</div>
        <textarea class="col-md-10 description"></textarea>
        <button class="col-md-1 saveBtn"><i class="fas fa-save"></i></button>
      </div>
    `;

// Append the time block to the container in the HTML
$('#timeBlocks').append(timeBlockHtml);
}

// Function to determine the class for time blocks based on current time
function determineTimeBlockClass(hour) {
  const currentHour = dayjs().hour(); // Get current hour in 24-hour format
  // Return class name based on time comparison
  if (hour < currentHour) return 'past'; // Time block is in the past
  if (hour === currentHour) return 'present'; // Time block is in the current hour
  return 'future'; // Time block is in the future
}    