const bunyan = require('bunyan')
const chalk = require('chalk')
const {get} = require('lodash')

const writeErr = (rec, level, color) => {
  // eslint-disable-next-line no-console
  console.error(
    '[%s] %s %s %s',
    chalk.hex('#eaeaea')(rec.name),
    chalk.gray(rec.time.toISOString()),
    color(level.toUpperCase()),
    `${rec.err.name}: ${rec.err.message}. ${rec.msg}`
  )
}

const writeInfo = (rec, level, color) => {
  // eslint-disable-next-line no-console
  console.log(
    '[%s] %s %s %s',
    chalk.hex('#eaeaea')(rec.name),
    chalk.gray(rec.time.toISOString()),
    color(level.toUpperCase()),
    rec.msg
  )
}

const loggerStream = {

  'debug': chalk.blue,

  'error': chalk.redBright,

  'fatal': chalk.bold.red,

  'info': chalk.green,

  'trace': chalk.whiteBright,

  'warn': chalk.yellowBright,

  write (rec) {
    const level = get(bunyan.nameFromLevel, rec.level)
    const color = get(loggerStream, level)
    if (rec.level >= bunyan.ERROR) {
      writeErr(rec, level, color)
    } else {
      writeInfo(rec, level, color)
    }
  }
}

/**
 * @const
 * @name githubResourceLogger
 *
 * @description
 * Provides a bunyan logger.
 *
 * @module democracy-ia/logger
 */

const githubResourceLogger = bunyan.createLogger({
  'level': bunyan.INFO,
  'name': 'github-resource-converter',
  'streams': [
    {
      'level': bunyan.INFO,
      'stream': loggerStream,
      'type': 'raw'
    }
  ]
})

/**
 * @exports githubResourceLogger
 */

module.exports = githubResourceLogger
