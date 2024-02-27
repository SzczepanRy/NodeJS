import tracer from "tracer"
const logger = tracer.colorConsole();

logger.log('hello');
logger.trace('hello');
logger.debug('hello');
logger.info('hello');
logger.warn('hello');
logger.error('hello');