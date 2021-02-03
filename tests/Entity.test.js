import Entity from '../src/entities/Entity';

test('should be a type of a function', () => {
  expect(typeof Entity).toBe('function');
});

test('should be a type of a function', () => {
  expect(typeof Entity).not.toBe('array');
});
