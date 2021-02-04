import SceneMain from '../src/scenes/SceneMain';

test('should be type of a function', () => {
  expect(typeof SceneMain).toBe('function');
});

test('should be type of a function', () => {
  expect(typeof SceneMain).not.toBe('array');
});
