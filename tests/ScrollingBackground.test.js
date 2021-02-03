import ScrollingBackground from '../src/background/ScrollingBackground';

test('It is a type of function', () => {
  expect(typeof ScrollingBackground).toBe('function');
});

test('It is a type of function', () => {
  expect(typeof ScrollingBackground).not.toBe('array');
});
