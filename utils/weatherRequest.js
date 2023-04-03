const request = require('postman-request');


function weatherRequest(lat,lon,location,callback){

    const url = `http://api.weatherstack.com/current?access_key=af8c1634dc8eb57c8ddfc6d222a71e81&query=${lat},${lon}`

    request({url:url,json:true},(error,res)=>{
        if(error){
            callback(error,data)
            console.log("Something went wrong!")
        }else if(res.body.error){
            callback(error,res.body.error.type)
        }
        else{
            const temp = res.body.current.temperature;
            const rainChance = res.body.current.precip;
            const formatedData = "The Temperature in " +location + " is "+temp+" C° and chance of rain is " + rainChance + "%";
            callback(error,formatedData);
        }
        
    });
}

module.exports = weatherRequest;