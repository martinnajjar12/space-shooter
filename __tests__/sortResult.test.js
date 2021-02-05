import sortResult from '../src/utils/sortResult';

jest.mock('../src/utils/fetchAPI');

test('should return an array of objects', () => {
  const expectedArray = [{ score: 50, user: 'Marwa' }, { score: 20, user: 'Muhib' }, { score: 15, user: 'Martin' }];
  sortResult().then(data => {
    expect(data).toEqual(expectedArray);
  });
});
