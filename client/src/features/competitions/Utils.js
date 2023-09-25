//Current Date
export function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
  }

//Format Date
export function getCurrentFormattedDate(date) {
  const eventDate = new Date(date);
  return eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  }
//Format Time
export function formatTimeTo12HourClock(time) {
  const eventTime = new Date(`1970-01-01T${time}`);
    return eventTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }