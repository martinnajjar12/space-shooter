import sortScore from '../src/util/sortScore';

test('should return an array of objects', () => {
  sortScore().then(data => {
    expect(data).toBe('array');
  });
});
