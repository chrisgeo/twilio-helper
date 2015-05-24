var twilioHelper = require('../lib');
var demand = require('must');

describe('twilio-helper', function () {
  it('should exist', function () {
    console.log(twilioHelper);
    demand(twilioHelper).to.exist();
  });

  it('success case', function(){
    // checked for success
    var numberToPurchase = '+16196210102';
    twilioHelper.purchasePhoneNumberAsync({
      nearPhoneNumber: numberToPurchase
    }).then(function(purchasedNumber) {
      demand(purchasedNumber).to.exist();
      assert.equal(purchasedNumber, numberToPurchase);
    });
  });

  it('Number Fails to purchase', function(){
    // checked for success
    var numberToPurchase = '+12122123456';
    twilioHelper.purchasePhoneNumberAsync({
      nearPhoneNumber: numberToPurchase
    }).catch(function(err){
      demand(err).to.exist();
      // figure out what err is
      console.log(err);
    });
  });
});
