expect = (chai && chai.expect) || require('chai').expect;

var detectPhantom = require('../../lib/detect-phantom');

describe('Tests Passing', function() {
    for (var key in detectPhantom) {
        if (detectPhantom.hasOwnProperty(key)) {
            it(key, function() {
                expect(detectPhantom[key]()).to.be.true;
            });
        }
    }
});