import { Event } from '../types';

export interface IEventRunner {
  TriggerEvent: (event: Event) => never;
}
