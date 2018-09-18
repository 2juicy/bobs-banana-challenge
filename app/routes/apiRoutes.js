module.exports = app => {
  app.post("/api/banana", (req, res) => {
    // Date can be formatted in the front end or back end with moment.js to match MM/DD/YYYY.
    console.log(req.body);
    // This will be a user input date
    let startDate = req.body.currentDate;
    // Take user input and turn into Date object.
    const d = new Date(startDate);
    // This will be user input for total calender days stay.
    let numberOfDays = req.body.totalDays;
    // Day of the week (from 0-6, Sunday to Saturday)
    let day = d.getDay();
    // Day of the month (from 1-31)
    let week = d.getDate();
    console.log(week);
    // Returns the month (from 0-11)
    let month = d.getMonth();
    let monthDays;
    // Variable for total cost and price
    let totalCost = 0;
    let price = 0;
    function findDays(x) {
      if (x == 1) {
        return (monthDays = 29);
      } else if (x == 3 || x == 5 || x == 8 || x == 10) {
        return (monthDays = 30);
      } else {
        return (monthDays = 31);
      }
    }
    findDays(month);
    // Checks week of the month and sets price
    function findPrice(x) {
      if (x <= 7) {
        return (price = 0.05);
      } else if (x > 7 && x <= 14) {
        return (price = 0.1);
      } else if (x > 14 && x <= 21) {
        return (price = 0.15);
      } else if (x > 21 && x <= 28) {
        return (price = 0.2);
      } else {
        return (price = 0.25);
      }
    }
    // Checks if it is a weekday or weekend and calculates total.
    for (let i = 0; i < numberOfDays; i++) {
      // Checks if weekday then calculates costs
      if (day !== 6 && day !== 0) {
        findPrice(week);
        totalCost = totalCost + price;
      }
      // Resets the day of the week to Sunday after Saturday.
      day++;
      if (day > 6) {
        day = day % 7;
      }
      // After the month is over this will calculate how many days in the new month and reset the date.
      week++;
      if (week > monthDays) {
        month++;
        findDays(month);
        week = 1;
      }
    }
    // Print out total.
    console.log(`Final Sum: ${totalCost}`);
    res.json(totalCost);
  });
};
