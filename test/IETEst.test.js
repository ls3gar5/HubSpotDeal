const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../src/IETest/test');

describe('App', function() {
    it('app should return hello', function() {
        const result = app.sayHello();
        assert.equal(result, 'hello');
        expect(result).to.equal('hello');
    })

    it('SayHello should return type string', function() {
        const result = app.sayHello();
        assert.typeOf(result, 'string');
        expect(result).to.be.a('string');
    })

    it('addNumbers should be above 5', function() {
        const result = app.addNumber(5,5);
        assert.isAbove(result, 5);
    })

    it('Get temp to celcuis', () => {
        const list = [23]
        const result = app.getCelcuis(list);
        expect(result[0]).to.deep.equal(-5);
    })  
});