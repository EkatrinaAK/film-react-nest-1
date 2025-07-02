import { JsonLogger } from './json.logger';

describe('jsonLogger tests', () => {
  const jsonLogger = new JsonLogger();
  const message = 'test message';
  const param1 = 'one';
  const param2 = 'two';
  const param3 = 'three';

  it('.log() level log should be in json format', () => {
    const mockFunction = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    jsonLogger.log(message, param1, param2, param3);

    const logWithParams = JSON.stringify({
      level: 'log',
      message: message,
      optionalParams: [param1, param2, param3],
    });
    expect(mockFunction).toHaveBeenCalledWith(logWithParams);

    jsonLogger.log(message);

    const logWithoutParams = JSON.stringify({
      level: 'log',
      message: message,
      optionalParams: [],
    });
    expect(mockFunction).toHaveBeenCalledWith(logWithoutParams);
  });

  it('.warn() level warn should be in json format', () => {
    const mockFunction = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    jsonLogger.warn(message, param1, param2, param3);

    const warnWithParams = JSON.stringify({
      level: 'warn',
      message: message,
      optionalParams: [param1, param2, param3],
    });
    expect(mockFunction).toHaveBeenCalledWith(warnWithParams);

    jsonLogger.warn(message);

    const warnWithoutParams = JSON.stringify({
      level: 'warn',
      message: message,
      optionalParams: [],
    });
    expect(mockFunction).toHaveBeenCalledWith(warnWithoutParams);
  });

  it('.error() level error should be in json format', () => {
    const mockFunction = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    jsonLogger.error(message, param1, param2, param3);

    const errorWithParams = JSON.stringify({
      level: 'error',
      message: message,
      optionalParams: [param1, param2, param3],
    });
    expect(mockFunction).toHaveBeenCalledWith(errorWithParams);

    jsonLogger.error(message);

    const errorWithoutParams = JSON.stringify({
      level: 'error',
      message: message,
      optionalParams: [],
    });
    expect(mockFunction).toHaveBeenCalledWith(errorWithoutParams);
  });
});
