/* eslint-disable jest/no-export */
// eslint-disable-next-line import/prefer-default-export
export function myHelper() {}

module.exports = function test() {};

module.exports = {
  something: 'that should be moved to a non-test file',
};

const myBeverage = {
  delicious: true,
  sour: false,
  one: null,
};

describe('my beverage', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
  test('is null', () => {
    expect(myBeverage.one).toBe(null);
  });
});
