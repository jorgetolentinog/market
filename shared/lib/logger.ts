import * as winston from "winston";

const LEVEL = Symbol.for("level");
const MESSAGE = Symbol.for("message");

const colorizer = winston.format.colorize();
let formats = [];

if (process.env.IS_OFFLINE) {
  formats = [
    winston.format.simple(),
    winston.format.printf((msg) =>
      colorizer.colorize(
        msg.level,
        `${msg.timestamp} - ${msg.level}: ${msg.message}`
      )
    ),
  ];
} else {
  formats = [winston.format.json()];
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "error",
  format: winston.format.combine(winston.format.timestamp(), ...formats),
  transports: [
    new winston.transports.Console({
      log(info, callback) {
        // Necesario para funcionar con lambda
        setImmediate(() => this.emit("logged", info));

        if (this.stderrLevels[info[LEVEL]]) {
          console.error(info[MESSAGE]);
          if (callback) callback();
          return;
        }

        console.log(info[MESSAGE]);
        if (callback) callback();
      },
    }),
  ],
});
