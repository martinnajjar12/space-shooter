import ChaserShip from '../src/entities/ChaserShip';

test('It is a type of function', () => {
  expect(typeof ChaserShip).toBe('function');
});

test('It is a type of function', () => {
  expect(typeof ChaserShip).not.toBe('array');
});
