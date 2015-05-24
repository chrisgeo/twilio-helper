'use strict';

var twilio = require('twilio'),
  requiredEnv = ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'],
  Promise = require("bluebird");

requiredEnv.forEach(function(val){
  if(!process.env.hasOwnProperty(val)){
    console.log('MISSING REQUIRED KEY: ' + val);
    process.exit(1);
  }
});

function TwilioHelper(){
  // get settings
  var capability = new twilio.Capability(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
  );

  console.log(capability);
  function purchasePhoneNumberAsync(spec){
    // returns promise

    return new Promise(function(resolve, reject){
      // do looks up
    });
  }


  // setup public members
  this.purchasePhoneNumberAsync = purchasePhoneNumberAsync;

  return this;
}

module.exports = new TwilioHelper();
