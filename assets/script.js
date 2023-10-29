var dateTracker = $('#currentDay');
var currentHour = dayjs().hour();
var APIKey = "de99e6b29e427c9fd645f9257f272d1e"

/* References Day.js to keep the current date and time displayed. */
var updateDate = function() {
  var now = dayjs().format('MMMM DD, YYYY [at] h:mm:ss A')
  dateTracker.text("It is currently: " + now)
}

updateDate();
setInterval(updateDate, 1000);