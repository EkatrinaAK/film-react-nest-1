import { TskvLogger } from './tskv.logger';

describe('tskvLogger tests', () => {
  const tskvLogger = new TskvLogger();
  const message = 'test message';
  const param1 = 'one';
  const param2 = 'two';
  const param3 = 'three';

  it('.log() level log should be in json format', () => {
    const mockFunction = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    tskvLogger.log(message, param1, param2, param3);

    const logWithParams = `level=log\tmessage=${message}\toptionalParams=${[param1, param2, param3]}\n`;
    expect(mockFunction).toHaveBeenCalledWith(logWithParams);

    tskvLogger.log(message);

    const logWithoutParams = `level=log\tmessage=${message}\toptionalParams=${[]}\n`;
    expect(mockFunction).toHaveBeenCalledWith(logWithoutParams);
  });

  it('.warn() level warn should be in json format', () => {
    const mockFunction = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    tskvLogger.warn(message, param1, param2, param3);

    const warnWithParams = `level=warn\tmessage=${message}\toptionalParams=${[param1, param2, param3]}\n`;
    expect(mockFunction).toHaveBeenCalledWith(warnWithParams);

    tskvLogger.warn(message);

    const warnWithoutParams = `level=warn\tmessage=${message}\toptionalParams=${[]}\n`;
    expect(mockFunction).toHaveBeenCalledWith(warnWithoutParams);
  });

  it('.error() level error should be in json format', () => {
    const mockFunction = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    tskvLogger.error(message, param1, param2, param3);

    const errorWithParams = `level=error\tmessage=${message}\toptionalParams=${[param1, param2, param3]}\n`;
    expect(mockFunction).toHaveBeenCalledWith(errorWithParams);

    tskvLogger.error(message);

    const errorWithoutParams = `level=error\tmessage=${message}\toptionalParams=${[]}\n`;
    expect(mockFunction).toHaveBeenCalledWith(errorWithoutParams);
  });
});
