/* eslint-env mocha */
import expect from 'expect';
import parserOptionsMapper from '../../../src/util/parserOptionsMapper';

describe('parserOptionsMapper', () => {
  it('should return an test case object', () => {
    const testCase = {
      code: '<div />',
      errors: [],
      options: {},
    };
    expect(parserOptionsMapper(testCase)).toEqual({
      code: '<div />',
      errors: [],
      options: {},
      parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
          jsx: true,
        },
      },
    });
  });
  it('should allow for overriding parserOptions', () => {
    const testCase = {
      code: '<div />',
      errors: [],
      options: {},
      parserOptions: {
        ecmaVersion: 5,
      },
    };
    expect(parserOptionsMapper(testCase)).toEqual({
      code: '<div />',
      errors: [],
      options: {},
      parserOptions: {
        ecmaVersion: 5,
        ecmaFeatures: {
          jsx: true,
        },
      },
    });
  });
});
