const request = require('postman-request');

function geoCode(address,callback){

    const url = `http://api.positionstack.com/v1/forward?access_key=7c270dac1c43cda1d37d2e01e87fe02c&query=${address}`;

    request({url:url,json:true},(error,res)=>{
        if(error){
            callback(error,undefined);
        }else if(res.body.data.length ===0){
            callback(error,{error: "Place not found"});
        } 
        else{
            const latitude = res.body.data[0].latitude;
            const longitude = res.body.data[0].longitude;
            const location = res.body.data[0].label;
            callback(undefined,{
                latitude:latitude,
                longitude:longitude,
                location: location
            });
        }
    });
}

module.exports = geoCode