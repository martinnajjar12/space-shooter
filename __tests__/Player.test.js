import Player from '../src/entities/Player';

test('should be type of function', () => {
  expect(typeof Player).toBe('function');
});

test('should be type of function', () => {
  expect(typeof Player).not.toBe('array');
});
