const { transports, createLogger, format } = require('winston');
const { printf, timestamp } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${level}: ${message} || ${timestamp}`;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    customFormat
),
  transports: 
    [new transports.File({ filename: './logs/apiTest.log' }),
    new transports.Console()]
});

module.exports = logger;