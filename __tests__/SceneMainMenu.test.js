import SceneMainMenu from '../src/scenes/SceneMainMenu';

test('should be type of a function', () => {
  expect(typeof SceneMainMenu).toBe('function');
});

test('should be type of a function', () => {
  expect(typeof SceneMainMenu).not.toBe('array');
});
