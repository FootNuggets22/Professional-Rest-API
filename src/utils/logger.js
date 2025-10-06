const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const coloredLevel = this.colorize(level, level.toUpperCase());
    
    let logMessage = `[${timestamp}] ${coloredLevel}: ${message}`;
    
    if (data && this.isDevelopment) {
      logMessage += ` ${JSON.stringify(data, null, 2)}`;
    }
    
    return logMessage;
  }

  colorize(level, text) {
    if (!this.isDevelopment) return text;
    
    const colorMap = {
      info: colors.cyan,
      warn: colors.yellow,
      error: colors.red,
      debug: colors.magenta,
      success: colors.green
    };
    
    const color = colorMap[level] || colors.white;
    return `${color}${text}${colors.reset}`;
  }

  info(message, data = null) {
    console.log(this.formatMessage('info', message, data));
  }

  warn(message, data = null) {
    console.warn(this.formatMessage('warn', message, data));
  }

  error(message, data = null) {
    console.error(this.formatMessage('error', message, data));
  }

  debug(message, data = null) {
    if (this.isDevelopment) {
      console.log(this.formatMessage('debug', message, data));
    }
  }

  success(message, data = null) {
    console.log(this.formatMessage('success', message, data));
  }
}

module.exports = new Logger();