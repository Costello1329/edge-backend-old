import { createLogger, format, transports } from "winston";

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "MM-DD HH:mm:ss" }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()]
});

export default logger;
