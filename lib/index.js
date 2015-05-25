'use strict';

var twilio = require('twilio'),
  requiredEnv = ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'];

requiredEnv.forEach(function(val){
  if(!process.env.hasOwnProperty(val)){
    console.log('MISSING REQUIRED KEY: ' + val);
    process.exit(1);
  }
});

function TwilioHelper(){
  // get settings
  var twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );


  function purchasePhoneNumberAsync(spec){
    return new Promise(function(resolve, reject){
      try {
        // split area code from number.
        // find available phonenumbers if first doesn't work
        twilioClient.availablePhoneNumbers('US').local.get({
          nearNumber: spec.numberToPurchase,
          excludeAllAddressRequired: "false",
          excludeLocalAddressRequired: "false",
          excludeForeignAddressRequired: "false"
        }, function(err, data) {
          if(err){
            throw err;
          }

          if(data.available_phone_numbers.length > 0){
            var numberToPurchase = data.available_phone_numbers.pop()['phone_number'],
                areaCode = numberToPurchase.slice(2, 5),
                phoneNumber = numberToPurchase.slice(5, 12);

            console.log(numberToPurchase, areaCode, phoneNumber);

            /** Probably should be another method that returns a Promise **/
            twilioClient.incomingPhoneNumbers.create({
              phoneNumber: phoneNumber,
              areaCode: areaCode
            }, function(err, number){
              if(err){
                throw err;
              }

              resolve(number.phone_number);
            });
          }
        });
      }catch(e){
        reject(e);
      }
    });
  }


  // setup public members
  this.purchasePhoneNumberAsync = purchasePhoneNumberAsync;

  return this;
}

module.exports = new TwilioHelper();
