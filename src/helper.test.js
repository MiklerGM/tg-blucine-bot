const helper = require('./helper');

describe('Run some tests', () => {
  helper.forceFetch(true);
  helper.testAPI();
});

describe('Skip some tests', () => {
  helper.forceFetch(false);
  helper.testAPI();
});