var twilioHelper = require('../lib');
var demand = require('must');
var assert = require("assert");

describe('twilio-helper', function () {
  it('should exist', function () {
    demand(twilioHelper).to.exist();
  });

  it('Get Number from area with available area codes', function(done){
    // checked for success
    var numberToPurchase = '+16196210102';
    twilioHelper.purchasePhoneNumberAsync({
      nearPhoneNumber: numberToPurchase
    }).then(function(purchasedNumber) {
      demand(purchasedNumber).to.exist();
      assert.equal(purchasedNumber, numberToPurchase);
      done();
    }).catch(function(e){
      console.log(e);
      done();
    });
  });

  it('Find number in same state and purchase', function(done){
    // checked for success
    var numberToPurchase = '+12122123456';
    twilioHelper.purchasePhoneNumberAsync({
      nearPhoneNumber: numberToPurchase
    }).then(function(purchasedNumber){
      assert.notEqual(purchasedNumber, numberToPurchase);
      done();
    }).catch(function(e){
      console.log(e);
      done();
    });
  });
});
