const moment = require('moment') // to format date

// export functions
module.exports = {
  formatDate: function (date, format) {
    // takes in date and whatever the format we want
    return moment(date).format(format) // return from it, pass date to moment and format whatever the format is
  }
}
