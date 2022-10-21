'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let number = input.match(/[.\d\/]+/g) || [''];
    let unit = input.match(/[a-z]+/ig) || undefined;
    //catch some invalid inputs
    if (!unit) {
      return res.send('invalid unit');
    }
    if (number.length > 1 && unit.length > 1) {
      return res.send('invalid number and unit');
    } else if (number.length > 1) {
      return res.send('invalid number');
    } else if (unit.length > 1) {
      return res.send('invalid unit');
    } else {
      let initNum = convertHandler.getNum(number);
      let initUnit = convertHandler.getUnit(unit);

      //catch some invalid inputs
      if (!initNum && !initUnit) {
        return res.send('invalid number and unit');
      } else if (!initNum) {
        return res.send('invalid number');
      } else if (!initUnit) {
        return res.send('invalid unit');
      } else {
        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        //capitalise 'l'
        if (initUnit === 'l') {
          initUnit = 'L';
        }
        if (returnUnit === 'l') {
          returnUnit = 'L';
        }

        return res.send({ initNum, initUnit, returnNum, returnUnit, string });
      }
    }


  });
};