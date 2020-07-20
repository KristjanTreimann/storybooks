const moment = require('moment') // to format date

// export functions
module.exports = {
  formatDate: function (date, format) {
    // takes in date and whatever the format we want
    return moment(date).format(format) // return from it, pass date to moment and format whatever the format is
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + ''
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(' '))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + '...'
    }
    return str
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '')
  }
}
