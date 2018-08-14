import { IActions } from '../../src/actions';

export const createActionsMock = (props?: Partial<IActions>) => ({
  addValueToVariable: jest.fn(),
  ...props
});
