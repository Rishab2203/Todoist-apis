function getRandomColorName() {
  const colorNames = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
    "Gray",
    "Black",
  ];

  const randomIndex = Math.floor(Math.random() * colorNames.length);
  return colorNames[randomIndex];
}
function getRandomDates() {
  // Define the start and end dates for the random 'currentDate'
  const startDate = new Date(2024, 0, 1); // January 1, 2024
  const endDate = new Date(2025, 11, 31); // December 31, 2025

  // Generate a random 'currentDate' between startDate and endDate
  const currentDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );

  // Generate a random 'dueDate' after 'currentDate'
  // Define the maximum number of days between 'currentDate' and 'dueDate'
  const maxDueDays = 30;
  // Generate a random number of days between 1 and maxDueDays
  const dueDays = Math.floor(Math.random() * maxDueDays) + 1;
  // Calculate 'dueDate' by adding 'dueDays' to 'currentDate'
  const dueDate = new Date(currentDate);
  dueDate.setDate(currentDate.getDate() + dueDays);

  // Format dates as DD/MM/YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return {
    currentDate: formatDate(currentDate),
    dueDate: formatDate(dueDate),
  };
}

function createRequestFilters(obj) {
  const result = [];
  for (let para in obj) {
    if (para != "page") {
      result.push(`${para} = ${obj[para]}`);
    }
  }
  return result.join(" AND ");
}

module.exports = { getRandomColorName, getRandomDates, createRequestFilters };
