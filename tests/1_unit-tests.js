const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    suite('Function convertHandler.getNum(input)', function () {

        test('Whole number input', function (done) {
            let input = ['32'];
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        test('Decimal number input', function (done) {
            let input = ['32.2'];
            assert.equal(convertHandler.getNum(input), 32.2);
            done();
        });

        test('Fractional input', function (done) {
            let input = ['3/4'];
            assert.equal(convertHandler.getNum(input), 3 / 4);
            done();
        });

        test('Fractional input with decimal', function (done) {
            let input = ['3.5/4'];
            assert.equal(convertHandler.getNum(input), 3.5 / 4);
            done();
        });

        test('Double fraction input', function (done) {
            let input = ['3/2/3'];
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test('No numerical input', function (done) {
            let input = [''];
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    suite('Function convertHandler.getUnit(input)', function () {

        test('Valid unit input', function (done) {
            let input = [['mi'], ['km'], ['gal'], ['l'], ['lbs'], ['kg']];
            input.forEach(val => assert.equal(convertHandler.getUnit(val), val));
            done();
        });

        test('Invalid unit input', function (done) {
            let input = ['Li'];
            assert.equal(convertHandler.getUnit(input), undefined);
            done();
        });
    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function () {
        test('Correct return unit', function (done) {
            let input = ['mi', 'km', 'gal', 'l', 'lbs', 'kg'];
            let result = ['km', 'mi', 'l', 'gal', 'kg', 'lbs'];
            input.forEach((val, i) => assert.equal(convertHandler.getReturnUnit(val), result[i]));
            done();
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function () {
        test('Correct spelled-out string', function (done) {
            let input = ['mi', 'km', 'gal', 'l', 'lbs', 'kg'];
            let result = ['miles', 'kilometers', 'gallons', 'liters', 'pounds', 'kilograms'];
            input.forEach((val, i) => assert.equal(convertHandler.spellOutUnit(val), result[i]));
            done();
        });
    });

    suite('Function convertHandler.convert(initNum, initUnit)', function () {

        test('Convert gal to L', function (done) {
            let input = ['32', 'gal'];
            assert.approximately(convertHandler.convert(input[0], input[1]), 121.13312, 0.1);
            done();
        });

        test('Convert L to gal', function (done) {
            let input = ['32', 'l'];
            assert.approximately(convertHandler.convert(input[0], input[1]), 8.45351, 0.1);
            done();
        });

        test('Convert mi to km', function (done) {
            let input = ['32', 'mi'];
            assert.approximately(convertHandler.convert(input[0], input[1]), 51.49888, 0.1);
            done();
        });

        test('Convert km to mi', function (done) {
            let input = ['32', 'km'];
            assert.approximately(convertHandler.convert(input[0], input[1]), 19.88393, 0.1);
            done();
        });

        test('Convert lbs to kg', function (done) {
            let input = ['32', 'lbs'];
            assert.approximately(convertHandler.convert(input[0], input[1]), 14.51494, 0.1);
            done();
        });

        test('Convert kg to lbs', function (done) {
            let input = ['32', 'kg'];
            assert.approximately(convertHandler.convert(input[0], input[1]), 70.54798, 0.1);
            done();
        });
    })
});