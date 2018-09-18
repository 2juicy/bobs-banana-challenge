module.exports = app => {
  app.get("/api/banana", (req, res) => {
    // Date can be formatted in the front end or back end with moment.js to match MM/DD/YYYY.
    const regex = RegExp(
      /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)(\d{2})/
    );
    console.log(req.query);
    // This will be a user input date
    let startDate = req.query.currentDate;
    const dateParts = req.query.currentDate.split("/");
    let year = dateParts[2];
    let isLeapYear = false;
    // Take user input and turn into Date object.
    const d = new Date(startDate);
    // This will be user input for total calender days stay.
    let numberOfDays = req.query.totalDays;
    // Day of the week (from 0-6, Sunday to Saturday)
    let day = d.getDay();
    // Day of the month (from 1-31)
    let week = d.getDate();
    // Returns the month (from 0-11, Jan to Dec)
    let month = d.getMonth();
    let monthDays;
    // Variable for total cost and price
    let totalCost = 0;
    let price = 0;
    // Functions
    // Checks if year is a leap year.
    function leapYear(x) {
      if (x % 400 === 0) {
        return (isLeapYear = true);
      } else if (x % 100 === 0) {
        return (isLeapYear = false);
      } else if (x % 4 === 0) {
        return (isLeapYear = true);
      } else {
        return (isLeapYear = false);
      }
    }
    leapYear(year);
    // Finds the month and sets the amount of days each calendar month.
    function findDays(x) {
      if (x == 1) {
        if (isLeapYear) {
          return (monthDays = 29);
        } else return (monthDays = 28);
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
        if (month > 11) {
          year++;
          leapYear(year);
          month = 0;
        }
        findDays(month);
        week = 1;
      }
    }
    // Print out total.
    let result;
    if (!regex.test(startDate)) {
      result = "Incorrect Date Format!";
      console.log("Incorrect Date Format");
    } else {
      result = totalCost.toFixed(2);
      console.log(`Total: $${result}`);
    }
    res.json({ totalPrice: result });
  });
};
