import { createLogger, format, transports } from "winston";
const { combine, errors, json, timestamp, colorize, printf } = format;

// Create the logger instance
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

// Add console transport in non-production
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
    })
  );
}

// Middleware function
const loggerMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    body: req.body,
    params: req.params,
    query: req.query,
  });
  next();
};

export { logger as default, loggerMiddleware };
