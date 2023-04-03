const express = require('express');
const app = express();

const weatherRequest = require('./utils/weatherRequest');
const geoCode = require('./utils/geoCode');

const port = process.env.PORT || 3001;

app.get('/getForecast',(req,res)=>{

    const address =  req.query.address;
    console.log(address);

    geoCode(address,(geoError,geoData)=>{
        
        if(geoError){
            res.send({
                error: "something went wrong"
            })
        }
        else if(geoData.error){
            res.send({
                error: "place not found"
            })
        }
        else{
            const {latitude,longitude,location} = geoData;
            weatherRequest(latitude,longitude,location, (weatherError,weatherData)=>{
                res.send({
                    forecast: weatherData
                })
            });
        }
        
    });
});

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log("listen");
});



