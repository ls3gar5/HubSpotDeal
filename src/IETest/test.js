module.exports = {
    sayHello: function() {
        return 'hello';
    },
    addNumber: function(value1,value2) {
        return value1 + value2;
    },
    getCelcuis: function(tempeture) {
        return tempeture.map(value => (value -32) * 5/9);
    }
}