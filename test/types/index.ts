import { EventProperties } from '../../src/types';

export const createProperties = (props?: Partial<EventProperties>) => ({
  value: 1,
  destinationVariable: 'variable',
  sourceVariable: 'variable',
  ...props
});
