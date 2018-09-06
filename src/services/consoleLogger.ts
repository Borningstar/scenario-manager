import { ILogger } from '.';

export const createConsoleLogger = (): ILogger => ({
  logInfo: (message: string) => console.log(message)
});
