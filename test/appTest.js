const assert = require('chai').assert;
const app = require('../test');

describe('App', function() {
    it('app should return hello', function() {
        assert.equal(app(), 'hello');
    })
});