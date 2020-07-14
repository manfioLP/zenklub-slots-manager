module.exports = {
  day: {
    validator: /\b(0?[1-9]|[1-2][0-9]|3[0-1])\b/,
    message: 'day must be a number between 1 and 31!'
  },
  month: {
    validator: /\b(0?[1-9]|10|11)\b/,
    message: 'month must be on JS number format - 0 to 11!'
  },
  year: {
    validator: /\b(20[0-8][0-9]|209[0-9])\b/,
    message: 'month must start with 20 and cant have more than 4 numbers'
  }
}
