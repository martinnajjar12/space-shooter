import PlayerLasers from '../src/entities/PlayerLaser';

test('should type of function', () => {
  expect(typeof PlayerLasers).toBe('function');
});

test('should type of function', () => {
  expect(typeof PlayerLasers).not.toBe('array');
});
