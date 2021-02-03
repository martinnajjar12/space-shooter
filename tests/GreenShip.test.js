import GreenShip from '../src/entities/GreenShip';

test('should be a type of function', () => {
  expect(typeof GreenShip).toBe('function');
});

test('should be a type of function', () => {
  expect(typeof GreenShip).not.toBe('array');
});
